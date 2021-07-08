
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.CAST_SPELL');
	//console.log(packet);

    
	var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
	CAST_SPELL_ANS.CasterPositionSyncID = performance.now();
	CAST_SPELL_ANS.CastInfo = {
        
    };
	var isSent = player.sendPacket(CAST_SPELL_ANS);
	console.log(CAST_SPELL_ANS);
};
