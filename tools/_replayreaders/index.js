
module.exports = function(filePath){
	console.log('_replayreaders', filePath);

	var replayUnpacked = null;
	if(filePath.endsWith('.json')) {
		replayUnpacked = require('../_replayreaders/json.js')(filePath);
	}
	else if(filePath.endsWith('.lrpkt')) {
		replayUnpacked = require('../_replayreaders/lrpkt.js')(filePath);
	}

	replayUnpacked.map((packet) => {

		if(!packet.BytesBuffer){
			if(packet.Bytes || packet.BytesB64)
				packet.BytesBuffer = Buffer.from(packet.Bytes || packet.BytesB64, 'base64');
			else if(packet.BytesHex)
				packet.BytesBuffer = Buffer.from(packet.BytesHex.split(' ').join('').split('-').join(''), 'hex');
		}

		return packet;
	})

	return replayUnpacked;
};
