import reader_json from './json';
import reader_lrpkt from './lrpkt';

const readers = {
	json: reader_json,
	lrpkt: reader_lrpkt,
};

export default function (filePath) {
	console.log('_replayreaders', filePath);

	let replayUnpacked: any[];
	if (filePath.endsWith('.json')) {
		replayUnpacked = readers['json'](filePath);
	}
	else if (filePath.endsWith('.lrpkt')) {
		replayUnpacked = readers['lrpkt'](filePath);
	}
	else
		throw new Error('Unknown replay file extension');

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
