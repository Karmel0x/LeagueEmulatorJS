
const { Vector2 } = require("three");
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.ATTENTION_PING');
	//console.log(packet);


	{
        var ATTENTION_PING = createPacket('ATTENTION_PING');
        ATTENTION_PING.Position = packet.Position;
        ATTENTION_PING.TargetNetID = packet.TargetNetID;
        ATTENTION_PING.pingType = packet.pingType;
        ATTENTION_PING.unk1 = 0xFB;
        var isSent = player.sendPacket(ATTENTION_PING);
	}

    //test
    var pos = new Vector2(packet.Position.x, packet.Position.y);
    global.Units['RED'].Minion[Object.keys(global.Units['RED'].Minion)[0]].move1(pos);

};
