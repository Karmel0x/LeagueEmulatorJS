var ConstantsUnit = require('../../Constants/Unit');
//var Types = require('../Constants/Types');
//const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../../PacketUtilities");
var FunctionsModel = require('../../Functions/Model');
const { Vector2 } = require('three');
var Missile = require('../Attacks/Missile');
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


class Unit {
    visibleForEnemy = false;
    collisionRadius = 48;
    
    constructor(team, num = 0, character = '', config = {}){
        Object.assign(this, config);
        this.netId = this.netId || ++global.lastNetId;

        this.info = this.info || {};
        this.info.type = this.info.type || this.constructor.name;
        this.info.team = this.info.team || team;
        this.info.num = this.info.num || num;
        this.info.spawnNum = this.info.spawnNum || this.info.num || num;
        this.info.name = this.info.name || character;
        
        this.model = this.model || FunctionsModel(this.info.type, this.info.team, this.info.name) || character;

        this.stats = new (Stats[this.info.type] || Stats.Unit)(this, ConstantsUnit[this.info.type]?.stats || {});
        this.death = new (Death[this.info.type] || Death.Unit)(this);
        this.battle = new (Battle[this.info.type] || Battle.Unit)(this);

        appendGlobal(this);
        console.debug(Date.now(), 'Created Unit', this);
        console.log('UnitsCount', global.UnitsCount.count);
        this.initialized();
        //console.log(global.Units);
    }
    initialized(){
        this.spawn();
    }
    spawn(){
        this.respawn();
    }

    attack_TargetNetID(TargetNetID, MovementData){
        if(!global.UnitsNetId[TargetNetID])
            return console.log('global.Units[netId] does not contain', TargetNetID);

        this.attack(global.UnitsNetId[TargetNetID], MovementData);
    }
    attack(target, MovementData){
        //console.debug(this.transform.position.distanceTo(target.transform.position), this.stats.Range.Total);
        if(this.transform.position.distanceTo(target.transform.position) > this.stats.Range.Total){
            this.moveCallback_range = this.stats.Range.Total;
            this.moveCallback = () => {
                this.moveCallback = null;
                this.attack(target, MovementData);
            };
            this.move1(target.transform.position);
            //this.move0(MovementData);
            return;
        }
        this.attackProcess(target);
    }
    attackProcess(target){
        var missile = new Missile(this, {speed: 2000});

        var NEXT_AUTO_ATTACK = createPacket('NEXT_AUTO_ATTACK', 'S2C');
        NEXT_AUTO_ATTACK.netId = this.netId;

        let TargetPosition = {
            x: target.transform.position.x,
            y: target.transform.position.y,
            z: 10,
        };
        let AttackSlot = 1;

        NEXT_AUTO_ATTACK.Attack = {
            TargetNetID: target.netId,
            TargetPosition: TargetPosition,
            AttackSlot: AttackSlot,
            MissileNextID: missile.netId,
            ExtraTime: 127,
        };
        
        var isSent = global.Teams.ALL.sendPacket_withVision(NEXT_AUTO_ATTACK);

        missile.fire(target);
        this.Waypoints = [];
    }
    teleport(position){
        this.transform.position = position;
        this.move1(position);
    }
    move1(position){
        var MovementData = {};
        MovementData.Waypoints = [this.transform.position, position];
        //MovementData.WaypointsCC = TranslateCenteredCoordinates.to(MovementData.Waypoints);
        this.moveProcess(MovementData);
    }
    move0(MovementData){
        this.moveCallback = null;
        this.moveProcess(MovementData);
    }
    halt1(){
        var MovementData = {};
        MovementData.Waypoints = [];
        this.moveProcess(MovementData);
    }
    halt0(){
        this.Waypoints = [];
    }
    WaypointsHalt = false;
    halt_start(send = false){
        this.WaypointsHalt = true;

        if(send)
            this.moveProcess();
    }
    halt_stop(send = false){
        this.WaypointsHalt = false;

        if(send)
            this.moveProcess();
    }
    moveProcess(MovementData = {}){
        this.Waypoints = MovementData.Waypoints || this.Waypoints;
        this.Waypoints[0] = this.transform.position;
        
        // this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
        var MOVE_ANS = createPacket('MOVE_ANS', 'LOW_PRIORITY');

        MOVE_ANS.netId = 0;//this.netId;
        MOVE_ANS.SyncID = performance.now();
        MOVE_ANS.TeleportNetID = this.netId;
        MOVE_ANS.TeleportID = 0x00;
        //MOVE_ANS.WaypointsCC = MovementData.WaypointsCC;
        MOVE_ANS.Waypoints = this.Waypoints;
        
        //console.log('MOVE_ANS', MOVE_ANS);
        var isSent = global.Teams.ALL.sendPacket_withVision(MOVE_ANS);
        //console.log(MOVE_ANS.MovementDataNormal[0].MovementData);

    }

    respawn(){
        this.battle.died = false;

        this.stats.CurrentHealth = this.stats.HealthPoints.Total;
        this.stats.CurrentMana = this.stats.ManaPoints.Total;
        
        let pos = ConstantsUnit[this.info.type]?.team?.[this.info.team]?.spawn?.[this.info.spawnNum] || {x: 0, y: 0};
        this.transform = this.transform || {
            position: new Vector2(pos.x, pos.y),
            rotation: 0,
        };
        this.Waypoints = [];
        
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
}


module.exports = Unit;
