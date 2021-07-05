var ConstantsUnit = require('../../Constants/Unit');
//var Types = require('../Constants/Types');
//const Packets = require("../Packets");
const {createPacket, sendPacket, sendPacket2} = require("../../PacketUtilities");
var FunctionsModel = require('../../Functions/Model');
var TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');
const { Vector2 } = require('three');

var Stats = {
    UNIT: require('./Stats/Unit'),
    PLAYER: require('./Stats/Player'),
};
var Death = {
    UNIT: require('./Death/Unit'),
    PLAYER: require('./Death/Player'),
    MINION: require('./Death/Minion'),
};
var Battle = {
    UNIT: require('./Battle/Unit'),
    PLAYER: require('./Battle/Player'),
};

global.Units = global.Units || {};
global.UnitsCount = 0;
global.UnitsByTeam = global.UnitsByTeam || {BLUE: {}, RED: {}, NEUTRAL: {}};
global.UnitsByTeamCount = 0;
global.baseNetId = 0x40000000;

class Unit {
    visibleForEnemy = false;

    constructor(unitType, config, team, num, name = ''){
        Object.assign(this, config);
        this.netId = ++global.baseNetId;


        this.unit = {
            type: unitType,
            team: team,
            num: num,
            spawnNum: num,
            name: name,
        };

        this.model = FunctionsModel(this.unit.type, this.unit.team, this.unit.name);

        this.stats = new (Stats[this.unit.type] || Stats['UNIT'])(this, ConstantsUnit[this.unit.type].stats);
        this.death = new (Death[this.unit.type] || Death['UNIT'])(this);
        this.battle = new (Battle[this.unit.type] || Battle['UNIT'])(this);

        this.respawn();
        console.log(Date.now(), 'Created Unit', this);
        global.Units[global.UnitsCount] = this;
        global.UnitsByTeam[team][global.UnitsCount] = this;
        this.id = global.UnitsCount++;
        console.log('UnitsCount', global.UnitsCount);
    }

    move(position, wp, tcc){
        //console.log(TranslateCenteredCoordinates.from(wp));

        let Waypoints = wp;//[this.transform.position, position];
        //this.transform.position = position;
        this.Waypoints = tcc;

        
        var MOVE_ANS = createPacket('MOVE_ANS', 'LOW_PRIORITY');

        MOVE_ANS.netId = 0;//this.netId;
        MOVE_ANS.SyncID = performance.now();
        MOVE_ANS.TeleportNetID = this.netId;
        MOVE_ANS.TeleportID = 0x00;
        MOVE_ANS.Waypoints = Waypoints;
        
        //console.log('MOVE_ANS', MOVE_ANS);
        var isSent = sendPacket(MOVE_ANS);
        //console.log(MOVE_ANS.MovementDataNormal[0].MovementData);

    }

    respawn(){
        this.battle.died = false;

        this.stats.CurrentHealth = this.stats.HealthPoints.Total;
        this.stats.CurrentMana = this.stats.ManaPoints.Total;
        
        let pos = ConstantsUnit[this.unit.type].team[this.unit.team].spawn[this.unit.spawnNum];
        this.transform = {
            position: new Vector2(pos.x, pos.y),
            rotation: 0,
        };
        this.Waypoints = [];
    }
}


module.exports = Unit;
