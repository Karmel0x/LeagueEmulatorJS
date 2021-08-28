var ConstantsUnit = require('../../Constants/Unit');
//var Types = require('../Constants/Types');
//const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../../PacketUtilities");
const { Vector2 } = require('three');
var Targetedshot = require('../Attacks/Missiles/Targetedshot');
const { appendGlobal } = require('./global.Units');

var Stats = {
    Unit: require('./Stats/Unit'),
    Player: require('./Stats/Player'),
    Turret: require('./Stats/Turret'),
};
var Death = {
    Unit: require('./Death/Unit'),
    Player: require('./Death/Player'),
    Minion: require('./Death/Minion'),
};
var Battle = {
    Unit: require('./Battle/Unit'),
    Player: require('./Battle/Player'),
};

const Inventory = require('./Controllers/Inventory');
const BuffController = require('./Controllers/BuffController');

var ACTIONS = {
    FREE: 0,
    STUNNED: 1,
    DASHING: 2,
    PREATTACKING: 3,
    ATTACKING: 4,
};


class Unit {
    visibleForEnemy = false;
    collisionRadius = 48;
    callbacks = {
		move: {},
		collision: {},
    };
    
    constructor(team, num = 0, character = '', config = {}){
        Object.assign(this, config);
        this.netId = this.netId || ++global.lastNetId;

        this.info = this.info || {};
        this.info.type = this.info.type || this.constructor.name;
        this.info.team = this.info.team || team;
        this.info.num = this.info.num || num;
        this.info.spawnNum = this.info.spawnNum || this.info.num || num;
        this.info.character = this.info.character || character;
        
        this.stats = new (Stats[this.info.type] || Stats.Unit)(this, ConstantsUnit[this.info.type]?.stats || {});
        this.death = new (Death[this.info.type] || Death.Unit)(this);
        this.battle = new (Battle[this.info.type] || Battle.Unit)(this);
        this.inventory = new Inventory(this);
        this.buffController = new BuffController(this);

        appendGlobal(this);
        console.debug(Date.now(), 'Created Unit', this);
        console.log('UnitsCount', global.UnitsCount.count);
        //console.log(global.Units);
    }
    initialized(){
        this.spawn();
    }
    spawn(){
        this.respawn();
    }

    Waypoints = [new Vector2(0, 0)];
    get position(){
        return this.Waypoints[0];
    }
    SpeedParams = null;
    moveTime = 0;
    ACTION = 0;
    attack_TargetNetID(TargetNetID, MovementData){
        if(!global.UnitsNetId[TargetNetID])
            return console.log('global.Units[netId] does not contain', TargetNetID);

        this.attack(global.UnitsNetId[TargetNetID], MovementData);
    }
    attack(target, MovementData){
        //console.debug(this.Waypoints[0].distanceTo(target.Waypoints[0]), this.stats.Range.Total);
        if(this.Waypoints[0].distanceTo(target.Waypoints[0]) > this.stats.Range.Total){
            this.callbacks.move.pending = {
                options: {
                    range: this.stats.Range.Total,
                },
                function: () => {
                    delete this.callbacks.move.pending;
                    this.attack(target, MovementData);
                }
            };
            this.move1(target.Waypoints[0]);
            //this.move0(MovementData);
            return;
        }
        this.attackProcess(target);
    }
    attackAns(options){
        var NEXT_AUTO_ATTACK = createPacket('NEXT_AUTO_ATTACK', 'S2C');
        NEXT_AUTO_ATTACK.netId = this.netId;

        let TargetPosition = {
            x: options.target.Waypoints[0].x,
            y: options.target.Waypoints[0].y,
            z: 10,
        };

        NEXT_AUTO_ATTACK.Attack = {
            TargetNetID: options.target.netId,
            TargetPosition: TargetPosition,
            AttackSlot: options.AttackSlot,
            MissileNextID: options.missile.netId,
            ExtraTime: 127,
        };
        
        var isSent = global.Teams.ALL.sendPacket_withVision(NEXT_AUTO_ATTACK);
    }
    attackProcess(target){
        var missile = new Targetedshot(this, {speed: 2000});
        this.attackAns({
            target,
            missile,
            AttackSlot: 1,
        });
        missile.fire(target, this.character.attackWindupPercent);
        this.moveClear();
    }

    respawn(){
        this.battle.died = false;

        this.stats.CurrentHealth = this.stats.HealthPoints.Total;
        this.stats.CurrentMana = this.stats.ManaPoints.Total;
        
        let pos = ConstantsUnit[this.info.type]?.team?.[this.info.team]?.spawn?.[this.info.spawnNum] || {x: 0, y: 0};
        this.Waypoints = [this.Waypoints[0] || new Vector2(pos.x, pos.y)];
        
	    this.SET_HEALTH();
        
		global.Teams[this.info.team].vision(this, true);
    }
    //SET_HEALTH(){
    //    var SET_HEALTH = createPacket('SET_HEALTH');
    //    SET_HEALTH.netId = this.netId;
    //    SET_HEALTH.count = 0;
    //    var isSent = global.Teams.ALL.sendPacket_withVision(SET_HEALTH);
    //}
    SET_HEALTH(){
        var SET_HEALTH = createPacket('SET_HEALTH');
        SET_HEALTH.netId = this.netId;
        SET_HEALTH.count = 0;
		SET_HEALTH.MaxHealth = this.stats.HealthPoints.Total;
		SET_HEALTH.Health = this.stats.CurrentHealth;
        var isSent = global.Teams.ALL.sendPacket_withVision(SET_HEALTH);
    }
    UPDATE_MODEL(character){
        var UPDATE_MODEL = createPacket('UPDATE_MODEL');
        UPDATE_MODEL.netId = this.netId;
        UPDATE_MODEL.bitfield = {
			OverrideSpells: true,
			ModelOnly: false,
			ReplaceCharacterPackage: true,
        };
        UPDATE_MODEL.ID = 0;
        UPDATE_MODEL.SkinID = 0;
        UPDATE_MODEL.SkinName = character;
        var isSent = this.sendPacket(UPDATE_MODEL);
    }
    SET_ANIMATION(animPairs){
        var SET_ANIMATION = createPacket('SET_ANIMATION');
        SET_ANIMATION.netId = this.netId;
        SET_ANIMATION.AnimationOverrides = [];
        for(let i in animPairs)
            SET_ANIMATION.AnimationOverrides.push({
		    	fromAnim: animPairs[i][0],
		    	toAnim: animPairs[i][1],
            });
        var isSent = this.sendPacket(SET_ANIMATION);
    }
}


module.exports = Unit;
