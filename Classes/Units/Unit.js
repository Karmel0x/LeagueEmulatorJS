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
    setWaypoints(Waypoints){
        var Waypoints0 = this.Waypoints[0];
        this.Waypoints = Waypoints;
        this.Waypoints[0] = Waypoints0;
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
        console.log(DASH);
    }
    WaypointsDash_MS = 0;
    dash(position, options){
        let WaypointsM = this.Waypoints;//todo: this.WaypointsPending
        this.Waypoints = [WaypointsM[0], position];
        this.WaypointsDash_MS = options.speed;
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
        this.moveCallback = () => {
            this.setWaypoints(WaypointsM);//todo: repath
            this.WaypointsDash_MS = 0;
            this.SpeedParams = null;
            if(this.Waypoints.length > 1)
                this.moveAns();
        };
        this.dashAns();
    }
    knockUp(position = null, options = {
        speed: 13,
        ParabolicGravity: 16.5,
        Facing: 1,
    }){
        position = position || new Vector2(this.Waypoints[0].x + 10, this.Waypoints[0].y + 10);//todo: random pos?
        this.dash(position, options);
    }
    move1(position){
        this.Waypoints = [this.Waypoints[0], position];
        this.moveAns();
    }
    move0(MovementData){
        this.moveCallback = null;
        
        if(MovementData.Waypoints && MovementData.Waypoints.length){
            this.setWaypoints(MovementData.Waypoints);
        }
        this.moveAns();
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
            this.moveCallback_range = this.stats.Range.Total;
            this.moveCallback = () => {
                this.moveCallback = null;
                this.attack(target, MovementData);
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
}


module.exports = Unit;
