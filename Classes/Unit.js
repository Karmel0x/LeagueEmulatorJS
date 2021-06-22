var ConstantsUnit = require('../Constants/Unit');
//var Types = require('../Constants/Types');
//const Packets = require("../Packets");
const {createPacket, sendPacket, sendPacket2} = require("../PacketUtilities");
var FunctionsModel = require('../Functions/Model');


/*function convert_Waypoints_to_CompressedWaypoints(object, Waypoints){
    object.flagsBuffer = [];//(CompressedWaypoints.size - 2) / 4 + 1;
    object.Waypoints = Waypoints;

    for (let i = 1; i < Waypoints.length; i++){
        let relativeX = Waypoints[i].X - Waypoints[i - 1].X;
        let flagX = relativeX <= Types.maxValues['int8'] && relativeX >= Types.minValues['int8'];
        object.flagsBuffer.push(flagX);
        if(flagX)
            Waypoints[i].X = relativeX;
        
        let relativeY = Waypoints[i].Y - Waypoints[i - 1].Y;
        let flagY = relativeY <= Types.maxValues['int8'] && relativeY >= Types.minValues['int8'];
        object.flagsBuffer.push(flagY);
        if(flagY)
            Waypoints[i].X = relativeY;
    }
}*/

global.Units = global.Units || {};
global.baseNetId = 0x40000000;

class Unit {
    constructor(unitType, config, team, num, name = ''){
        Object.assign(this, config);
        this.netId = ++global.baseNetId;
        global.Units[0] = this;

        this.unit = {
            type: unitType,
            team: team,
            num: num,
            spawnNum: num,
            name: name,
        };
        console.log('Created Unit', this);

        this.model = FunctionsModel(this.unit.type, this.unit.team, this.unit.name);

        this.stats = JSON.parse(JSON.stringify(ConstantsUnit[this.unit.type].stats));
        this.respawnTime = JSON.parse(JSON.stringify(ConstantsUnit[this.unit.type].respawnTime || false));
        this.totalRespawnTime = 0;

        this.respawn();
    }

    move(position, wp){
        let Waypoints = wp;//[this.transform.position, position];
        this.transform.position = position;

        
        var MOVE_ANS = createPacket('MOVE_ANS');

        MOVE_ANS.packet.netId = 0;//this.netId;
        MOVE_ANS.packet.SyncID = performance.now();
        MOVE_ANS.packet.TeleportNetID = this.netId;
        MOVE_ANS.packet.TeleportID = 0x00;
        MOVE_ANS.packet.Waypoints = Waypoints;
        
        //console.log('MOVE_ANS', MOVE_ANS);
        var isSent = sendPacket(MOVE_ANS);
        //console.log(MOVE_ANS.packet.MovementDataNormal[0].MovementData);

    }

    die(){
        this.onDie();
    }
    onDie(){
        this.died = Date.now() / 1000;

        this.afterDie();
    }
    async afterDie(){
        if(!this.died)
            return console.log('[weird] died but not died?');

        this.lastRespawnTime = this.getRespawnTime() || this.respawnTime || false;

        if(this.lastRespawnTime === false)
            return;

        this.totalRespawnTime += this.lastRespawnTime;
        while(this.died + this.lastRespawnTime < Date.now() / 1000)
            continue;

        this.respawn();
    }
    respawn(){
        this.died = false;

        this.stats.hp = this.stats.maxHp;
        this.stats.mp = this.stats.maxMp;
        
        this.transform = JSON.parse(JSON.stringify(
            ConstantsUnit[this.unit.type].team[this.unit.team].spawn[this.unit.spawnNum]
        ));
    }
}


module.exports = Unit;
