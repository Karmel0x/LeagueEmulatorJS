var ConstantsUnit = require('../../Constants/Unit');
//var Types = require('../Constants/Types');
//const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../../PacketUtilities");
var FunctionsModel = require('../../Functions/Model');
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

const Inventory = require('../Inventory');
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
        this.info.name = this.info.name || character;
        
        this.model = this.model || FunctionsModel(this.info.type, this.info.team, this.info.name) || character;

        this.stats = new (Stats[this.info.type] || Stats.Unit)(this, ConstantsUnit[this.info.type]?.stats || {});
        this.death = new (Death[this.info.type] || Death.Unit)(this);
        this.battle = new (Battle[this.info.type] || Battle.Unit)(this);
        this.inventory = new Inventory(this);
        this.buffController = new BuffController(this);

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

    Waypoints = [new Vector2(0, 0)];
    get position(){
        return this.Waypoints[0];
    }
    setWaypoints(Waypoints, send = true){//todo: repath if needed
        if(this.SpeedParams){
            var Waypoints0 = this.WaypointsPending[0];
            this.WaypointsPending = Waypoints;
            this.WaypointsPending[0] = Waypoints0;
            return;
        }
        var Waypoints0 = this.Waypoints[0];
        this.Waypoints = Waypoints;
        this.Waypoints[0] = Waypoints0;
        if(send)
            this.moveAns();
    }
    teleport(position){
        this.Waypoints = [position];
        this.moveAns();// that's wrong
    }
    SpeedParams = null;
    dashAns(){
        var DASH = createPacket('DASH');

        DASH.netId = 0;
        DASH.TeleportNetID = this.netId;

        DASH.Waypoints = this.Waypoints;
        DASH.SpeedParams = this.SpeedParams;
        
        var isSent = global.Teams.ALL.sendPacket_withVision(DASH);
        //console.log(DASH);
    }
    ACTION = 0;
    dash(position, options){
        this.ACTION = ACTIONS.DASHING;

        this.SpeedParams = {//todo: names? then just Object.assign
            PathSpeedOverride: options.speed || 1000,
            ParabolicGravity: options.ParabolicGravity || 0,
            ParabolicStartPoint: options.ParabolicStartPoint || {x: 0, y: 0},
            Facing: options.Facing || 0,
            FollowNetID: options.FollowNetID || 0,
            FollowDistance: options.FollowDistance || 0,
            FollowBackDistance: options.FollowBackDistance || 0,
            FollowTravelTime: options.FollowTravelTime || 0,
        };

        this.WaypointsPending = this.Waypoints;
        this.Waypoints = [this.WaypointsPending[0], position];
        
        this.callbacks.move.dash = {
            options: {
                range: 1,
            },
            function: () => {
                this.ACTION = ACTIONS.FREE;
                this.SpeedParams = null;
                this.setWaypoints(this.WaypointsPending, this.WaypointsPending.length > 1);
                if(options.callback)
                    options.callback();
            }
        };
        this.dashAns();
    }
	static getPositionBetweenRange(SourcePosition, TargetPosition, range = 0, minRange = 0){

		var PositionBetweenRange = new Vector2(TargetPosition.x, TargetPosition.y);
		PositionBetweenRange.sub(SourcePosition);
	    if(PositionBetweenRange.length() == 0)
		    PositionBetweenRange.x = 0.001;
		PositionBetweenRange.clampLength(minRange ?? range, range);
		PositionBetweenRange.add(SourcePosition);

		return PositionBetweenRange;
	}
    dashTo(position, options){
        var pos = Unit.getPositionBetweenRange(this.Waypoints[0], position, options.range, options.minRange);
        this.dash(pos, options);
    }
	static getRandomPositionClamped(length = 10){
        var RandomPositionClamped = new Vector2().random();
        RandomPositionClamped.subScalar(0.5).normalize();
        RandomPositionClamped.multiplyScalar(length);

		return RandomPositionClamped;
	}
    // idk, i belive it can be made better
    knockAside(SourcePosition, distance = 100, minDistance = null, options = {}){
        minDistance = minDistance ?? distance;
        options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
        options.ParabolicGravity = options.ParabolicGravity || 0;
        options.Facing = options.Facing ?? 1;

        var position = Unit.getPositionBetweenRange(this.Waypoints[0], SourcePosition, distance, minDistance);
        this.dash(position, options);
    }
    knockBack(SourcePosition, distance = 100, minDistance = null, options = {}){
        this.knockAside(SourcePosition, -distance, -minDistance, options);
    }
    knockUp(options = {}){
        options.speed = options.speed || (10 / (options.duration || 1));
        options.ParabolicGravity = options.ParabolicGravity || 16.5;
        options.Facing = options.Facing ?? 1;

        var position = Unit.getRandomPositionClamped(10);
        position.add(this.Waypoints[0]);
        this.dash(position, options);
    }
    move1(position){
        this.setWaypoints([this.Waypoints[0], position]);
    }
    move0(MovementData){
        //if(this.ACTION != ACTIONS.DASHING)
        //    this.moveCallback = null;
        if(this.callbacks.move.pending)
            delete this.callbacks.move.pending;
        
        if(MovementData.Waypoints && MovementData.Waypoints.length){
            this.setWaypoints(MovementData.Waypoints);
        }
    }
    halt0(send = false){
        this.moveClear();

        if(send)
            this.moveAns();
    }
    WaypointsHalt = false;
    halt_start(send = false){
        this.WaypointsHalt = true;

        if(send)
            this.moveAns();
    }
    halt_stop(send = true){
        this.WaypointsHalt = false;

        if(send)
            this.moveAns();
    }
    moveClear(){
        this.Waypoints = [this.Waypoints[0]];
    }
    get MovementData(){
        let movementData = {
            TeleportNetID: this.netId,
            //SyncID: performance.now(),
        };

        if(this.Waypoints.length > 1){
            movementData.Waypoints = this.Waypoints;
            if(this.SpeedParams)
                movementData.SpeedParams = this.SpeedParams;
        }else{
            movementData.Position = this.Waypoints[0];
            movementData.Forward = {x: 0, y: 0};
        };

        return movementData;
    }
    moveAns(){
        // this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
        var MOVE_ANS = createPacket('MOVE_ANS', 'LOW_PRIORITY');

        MOVE_ANS.netId = 0;//this.netId;
        MOVE_ANS.TeleportNetID = this.netId;
        MOVE_ANS.TeleportID = 0x00;
        //MovementData.WaypointsCC = TranslateCenteredCoordinates.to(MovementData.Waypoints);
        //MOVE_ANS.WaypointsCC = MovementData.WaypointsCC;
        MOVE_ANS.Waypoints = this.WaypointsHalt ? [] : this.Waypoints;
        
        var isSent = global.Teams.ALL.sendPacket_withVision(MOVE_ANS);
        //console.log('MOVE_ANS', MOVE_ANS);
        //console.log(MOVE_ANS.MovementDataNormal[0].MovementData);
    }
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
        missile.fire(target, 18.839);//18.839 = this.champion.attackWindupPercent
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
