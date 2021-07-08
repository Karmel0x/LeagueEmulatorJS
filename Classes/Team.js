var ConstantsUnit = require('../Constants/Unit');
const {createPacket, sendPacket} = require("../PacketUtilities");
const TEAM = require('../Constants/TEAM');
const loadingStages = require('../Constants/loadingStages');


global.Teams = global.Teams || {};

class Team {
    constructor(team){
        this.team = team;
        //this.PLAYER = {};
        //this.UNIT = {};
        //this.TURRET = {};
        //this.MINION = {};
    }
    static createAll(){
        global.Teams['BLUE'] = new Team('BLUE');
        global.Teams['RED'] = new Team('RED');
        global.Teams['ALL'] = new Team('ALL');
    }
    
    sendPacket_withVision(packet){
        this.sendPacket(packet);
    }
    sendPacket(packet, minStage = loadingStages.NOT_CONNECTED){
        for(let player_num in global.Units[this.team].PLAYER)
            global.Units[this.team].PLAYER[player_num].sendPacket(packet, minStage);
    }
    vision(target, enters = true){
        //if(target.info.type == 'NEXUS' || target.info.type == 'INHIBITOR' || target.info.type == 'TURRET')
        //    return;

        //console.log('vision', target, see);
        if(enters){
            console.log('enters vision', this.team, target.netId);

            var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
            OBJECT_SPAWN.netId = target.netId;
            OBJECT_SPAWN.ShieldValues = {
                Magical: 0,
                Physical: 0,
                MagicalAndPhysical: 0,
            };
            OBJECT_SPAWN.LookAtPosition = {x: 1, y: 0, z: 0};
            OBJECT_SPAWN.CharacterStackData = [
                {
                    SkinName: target.model
                }
            ];
            OBJECT_SPAWN.MovementData = {
                //SyncID: 0x0F0FD189,
                Position: target.transform.position,
                Forward: {x: 0, y: 0},
            };
            var isSent = this.sendPacket(OBJECT_SPAWN, loadingStages.IN_GAME);
            

            //var SET_HEALTH = createPacket('SET_HEALTH');
            //SET_HEALTH.netId = target.netId;
            //SET_HEALTH.count = 0;
            //var isSent = this.sendPacket(SET_HEALTH);
        }else{
            console.log('leaves vision', this.team, target.netId);

            var LEAVE_VISION = createPacket('LEAVE_VISION');
            LEAVE_VISION.netId = target.netId;
            var isSent = this.sendPacket(LEAVE_VISION, loadingStages.IN_GAME);
        }

    }
}


module.exports = Team;
