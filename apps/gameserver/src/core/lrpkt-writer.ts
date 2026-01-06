
import RelativeDataView from '@repo/network/relative-data-view';
import fs from 'fs';
import path from 'path';

export type LrpktPlayer = {
	accountID: number;
	assists: number;
	champion: string;
	deaths: number;
	kills: number;
	level: number;
	nodeNeutralizes: number;
	summoner: string;
	team: number;
	won: boolean;
};

export type LrpktHeader = {
	accountID: number;
	clientHash: string | null;
	clientVersion: string;
	encryptionKey: string;
	firstWinBonus: number;
	gameMode: number;
	map: number;
	matchID: number;
	matchLength: number;
	matchType: number;
	name: string;
	observerStream: boolean;
	players: LrpktPlayer[];
	queueType: string | null;
	ranked: boolean;
	region: string;
	replayID: number;
	replayVersion: string;
	serverAddress: string;
	serverPort: number;
	spectatorMode: boolean;
	statsVersion: number;
	summonerName: string;
	teams: any | null;
	timestamp: number;
	winningTeam: number;
};

export type LrpktPacket = {
	time: number;
	channel: number;
	direction: 'sent' | 'recv';
	peers: number[];
	data: ArrayBufferLike;
};

export default class LrpktWriter {

	static initialize(filePath: string, headerData?: Partial<LrpktHeader>) {
		const lrpktWriter = new LrpktWriter(filePath, headerData);
		lrpktWriter.open();
		return lrpktWriter;
	}

	private filePath: string;
	private fileStream: fs.WriteStream | null = null;
	private headerData?: Partial<LrpktHeader>;

	constructor(filePath: string, headerData?: Partial<LrpktHeader>) {
		this.filePath = filePath;
		this.headerData = headerData;
	}

	private ensureDirectory() {
		const dir = path.dirname(this.filePath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
	}

	open() {
		if (this.fileStream) {
			return;
		}

		this.ensureDirectory();
		this.fileStream = fs.createWriteStream(this.filePath, { flags: 'w' });

		if (this.headerData) {
			const headerJson = JSON.stringify(this.headerData);
			this.writeHeader(headerJson);
		}
	}

	private writeHeader(headerData: string = '') {
		const fileStream = this.fileStream!;

		// Header structure from lrpkt reader
		const headerSize = 16; // 4 (marker) + 4 (size) + 8 (pad)
		const dvr = RelativeDataView.alloc(headerSize);

		// Header marker
		dvr.writeChar('n');
		dvr.writeChar('f');
		dvr.writeChar('o');
		dvr.writeUint8(0x00);

		// Header size
		dvr.writeUint32(headerData.length);

		// Padding
		dvr.writeByteArray(new Uint8Array(8));

		// Header data
		dvr.writeCharArray(headerData, headerData.length);

		fileStream.write(Buffer.from(dvr.buffer));

		// 16-byte alignment padding for header data
		const remain = headerData.length % 16;
		if (remain !== 0) {
			const paddingSize = 16 - remain;
			fileStream.write(Buffer.alloc(paddingSize));
		}
	}

	writePacket(packet: LrpktPacket) {
		const fileStream = this.fileStream!;

		const data = new Uint8Array(packet.data);
		const chunkSize = 12 + data.byteLength; // 4 (size) + 4 (time) + 1 (channel) + 3 (direction + peers) + data

		const dvr = RelativeDataView.alloc(4 + chunkSize); // 4 for marker

		// Packet chunk marker
		dvr.writeChar('p');
		dvr.writeChar('k');
		dvr.writeChar('t');
		dvr.writeUint8(0x00);

		// Packet structure
		dvr.writeUint32(data.byteLength); // packet size
		dvr.writeFloat(packet.time);
		dvr.writeUint8(packet.channel);
		dvr.writeUint8(packet.direction === 'sent' ? 1 : 0);
		// Pack peers as bitmask (2 bytes, each bit represents peer 0-15)
		let peersMask = 0;
		for (let i = 0; i < packet.peers.length; i++) {
			const peer = packet.peers[i]!;
			if (peer >= 0 && peer < 16) {
				peersMask |= (1 << peer);
			}
		}
		dvr.writeUint16(peersMask); // peers bitmask (2 bytes)
		dvr.writeByteArray(data); // packet data

		fileStream.write(Buffer.from(dvr.buffer));

		// 16-byte alignment padding for packet data
		const remain = data.byteLength % 16;
		if (remain !== 0) {
			const paddingSize = 16 - remain;
			fileStream.write(Buffer.alloc(paddingSize));
		}
	}

	close() {
		if (this.fileStream) {
			this.fileStream.end();
			this.fileStream = null;
		}
	}
}
