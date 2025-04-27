import reader_json from './json';
import reader_lrpkt from './lrpkt';
import { ReplayFileReader, ReplayRecord } from './replay-reader';

const readers = {
	json: reader_json,
	lrpkt: reader_lrpkt,
};

export default function (filePath: string) {
	const ext = filePath.split('.').pop();
	if (!ext)
		throw new Error('unknown replay file extension');

	const reader = readers[ext as keyof typeof readers];
	if (!reader)
		throw new Error('unknown replay file extension');

	const replay: ReturnType<ReplayFileReader> = reader(filePath);

	const replay2 = replay.map((record, i) => {
		let data: ArrayBuffer | Buffer | undefined = undefined;
		if (record.data)
			data = record.data;
		else if (record.dataBase64)
			data = Buffer.from(record.dataBase64, 'base64');
		else if (record.dataHex)
			data = Buffer.from(record.dataHex.split(' ').join('').split('-').join(''), 'hex');

		if (!data) {
			//throw new Error(`invalid data in record ${i}`);
			console.log(`invalid data in record ${i}`);
			return;
		}

		if (data instanceof Buffer)
			data = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;

		return {
			time: record.time,
			peerNums: record.peerNums,
			data,
			channel: record.channel,
		} as ReplayRecord;
	});

	const replay3 = replay2.filter(Boolean) as ReplayRecord[];

	if (replay3.every(v => v.time < 10 * 1000)) {
		replay3.forEach(v => {
			v.time *= 1000;
		});
	}

	return replay3;
}
