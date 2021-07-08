var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");
const loadingStages = require('../../Constants/loadingStages');


class Player extends Unit {
    KillDeathCounter = 0;
    loaded = false;

    constructor(config, team, num){
        super('PLAYER', config, team, num);

    }
    initialize(){
        //this.netId = 0x400005ed;
        this.info = this.info || {};
        this.info.spawnNum = 5;
        this.model = 'Ezreal';
        this.loadingStage = 0;
    }
    sendPacket(packet, minStage = loadingStages.NOT_CONNECTED){
        if(this.loadingStage < minStage)
            return;
        
        sendPacket(this.peer_num, packet);
    }
    //vision(target, enters = true){
    //    if(!this.loaded)
    //        return;
//
    //    //console.log('vision', target, see);
    //    if(enters){
    //        console.log('enters vision', this.netId, target.netId);
//
    //        var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
    //        OBJECT_SPAWN.netId = target.netId;
    //        OBJECT_SPAWN.ShieldValues = {
    //            Magical: 0,
    //            Physical: 0,
    //            MagicalAndPhysical: 0,
    //        };
    //        OBJECT_SPAWN.LookAtPosition = {x: 1, y: 0, z: 0};
    //        OBJECT_SPAWN.CharacterStackData = [
    //            {
    //                SkinName: target.model
    //            }
    //        ];
    //        OBJECT_SPAWN.MovementData = {
    //            //SyncID: 0x0F0FD189,
    //            Position: target.transform.position,
    //            Forward: {x: 0, y: 0},
    //        };
    //        var isSent = this.sendPacket(OBJECT_SPAWN);
    //    }else{
    //        console.log('leaves vision', this.netId, target.netId);
//
    //        var LEAVE_VISION = createPacket('LEAVE_VISION');
    //        LEAVE_VISION.netId = target.netId;
    //        var isSent = this.sendPacket(LEAVE_VISION);
    //    }
//
    //}
    SET_HEALTH(){
    }
}


module.exports = Player;
