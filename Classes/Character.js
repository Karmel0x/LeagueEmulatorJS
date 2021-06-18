var ConstantsCharacter = require('../Constants/Character');
//var Types = require('../Constants/Types');
//const Packets = require("../Packets");
const {createPacket, sendPacket, sendPacket2} = require("../PacketUtilities");


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
var baseNetId = 0x40000000;

class Character {
    constructor(characterType, config, team, num){
        Object.assign(this, config);
        this.netId = ++baseNetId;
        this.characterType = characterType;
        this.transform = JSON.parse(JSON.stringify(ConstantsCharacter[this.characterType][team].spawn[num]));
    }

    move(position, wp){
        let Waypoints = wp;//[this.transform.position, position];
        this.transform.position = position;

        //sendpacket
        /*var S2C_MOVE_ANS = createPacket('S2C_MOVE_ANS');
        S2C_MOVE_ANS.packetTemplate = JSON.parse(JSON.stringify(Packets.cmd[S2C_MOVE_ANS.packetName])).packet;
        S2C_MOVE_ANS.packet.bitfield1 = 0;
        if(Waypoints)
            S2C_MOVE_ANS.packet.bitfield1 |= (Waypoints.length << 1);

        
        var MovementData = {};
        MovementData.TeleportNetID = 0;
        MovementData.TeleportID = 0;

        if(MovementData.TeleportID)
            S2C_MOVE_ANS.packet.bitfield1 |= 1;
        convert_Waypoints_to_CompressedWaypoints(MovementData, Waypoints);

        
        S2C_MOVE_ANS.packet.MovementDataNormal = [{MovementData:MovementData}];
        S2C_MOVE_ANS.packet.MovementDataNormal_length = S2C_MOVE_ANS.packet.MovementDataNormal.length;

        var isSent = sendPacket(S2C_MOVE_ANS);
        console.log(S2C_MOVE_ANS.packet.MovementDataNormal[0].MovementData);*/

        var S2C_MOVE_ANS = createPacket('S2C_MOVE_ANS');
        //S2C_MOVE_ANS.packet.MovementDataNormal = [{
        //    TeleportNetID: 0,
        //    TeleportID: 0,
        //    Waypoints: Waypoints,
        //}];
        //S2C_MOVE_ANS.packet.MovementDataNormal_length = S2C_MOVE_ANS.packet.MovementDataNormal.length;
        S2C_MOVE_ANS.packet.netId = 0x40000001;
        S2C_MOVE_ANS.packet.SyncID = 0x08882617;//random?
        S2C_MOVE_ANS.packet.TeleportNetID = 0x40000001;
        S2C_MOVE_ANS.packet.TeleportID = 0x00;
        S2C_MOVE_ANS.packet.Waypoints = Waypoints;
        S2C_MOVE_ANS.packet.MovementDataNormal_length = 1;
        
        console.log('S2C_MOVE_ANS', S2C_MOVE_ANS);
        var isSent = sendPacket2(S2C_MOVE_ANS, S2C_MOVE_ANS.packetTemplate(S2C_MOVE_ANS.packet));
        //console.log(S2C_MOVE_ANS.packet.MovementDataNormal[0].MovementData);

    }
}


module.exports = Character;
