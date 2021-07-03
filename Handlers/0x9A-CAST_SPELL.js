
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.CAST_SPELL');
	//console.log(obj1);

    
	var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
	CAST_SPELL_ANS.CasterPositionSyncID = performance.now();
	CAST_SPELL_ANS.CastInfo = {
        
    };
	var isSent = sendPacket(CAST_SPELL_ANS);
	console.log(CAST_SPELL_ANS);
};
