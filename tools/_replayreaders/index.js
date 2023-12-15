import reader_json from './json.js';
import reader_lrpkt from './lrpkt.js';

const readers = {
	json: reader_json,
	lrpkt: reader_lrpkt,
};

export default function (filePath) {
	console.log('_replayreaders', filePath);

	let replayUnpacked = null;
	if (filePath.endsWith('.json')) {
		replayUnpacked = readers['json'](filePath);
	}
	else if (filePath.endsWith('.lrpkt')) {
		replayUnpacked = readers['lrpkt'](filePath);
	}

	replayUnpacked.map((packet) => {

		if (!packet.BytesBuffer) {
			if (packet.Bytes || packet.BytesB64)
				packet.BytesBuffer = Buffer.from(packet.Bytes || packet.BytesB64, 'base64');
			else if (packet.BytesHex)
				packet.BytesBuffer = Buffer.from(packet.BytesHex.split(' ').join('').split('-').join(''), 'hex');
		}

		return packet;
	});

	return replayUnpacked;
}
