
import registerPackets from '@repo/packets/register';
import fs from 'fs';
import type ws from 'ws';
import _replayreaders from './_replayreaders/index';
import type { ReplayRecord } from './_replayreaders/replay-reader';
import { sendJson, sendJsonToAll } from './extended-web-socket';
import { wss } from './init_client-server';
import packetParser from './packet-parser';

const replayDir = '../../temp/replays/';

let replayUnpacked: ReplayRecord[];
let pId = 0;
let gs: ws | undefined = undefined;

function sendToGs(data: any) {
	if (gs)
		sendJson(gs, data);
}

registerPackets();

wss.on('connection', (ws) => {
	ws.on('message', (data) => {

		let res = JSON.parse(data as unknown as string);
		console.log(res);

		if (res.cmd === 'gs') {
			gs = ws;
		}
		else if (res.cmd === 'loadpackets') {

			let offset = res.offset || 0;
			if (offset < 0)
				offset = replayUnpacked.length + offset;

			let limit = (res.limit || 2000);
			let packetsearch: string[] = res.packetsearch || [];

			for (let i = offset, l = replayUnpacked.length, ll = 0; i < l && ll < limit; i++) {
				let packetDetails = packetParser(replayUnpacked[i]!, i + 1);

				if (!packetDetails)
					continue;

				if (packetsearch && packetsearch.length) {

					packetsearch = packetsearch.map(v => v.toLowerCase());
					let values = Object.values(packetDetails).map(v => `${v}`.toLowerCase());

					let found = values.some(v => packetsearch.some(v2 => v.includes(v2)));
					if (!found)
						continue;
				}

				sendJson(ws, {
					cmd: 'newpacket',
					packet: packetDetails,
				});
				ll++;
			}

			sendJson(ws, {
				cmd: 'endloading',
			});
		}
		else if (res.cmd === 'loadpackets2') {

			let start = res.start || 0;
			let end = (res.end || 2000);
			let packetsearch: string[] = res.packetsearch || [];

			for (let i = start, l = replayUnpacked.length, ll = 0; i < l && ll < end; i++) {
				ll++;
				let packetDetails = packetParser(replayUnpacked[i]!, i + 1);

				if (!packetDetails)
					continue;

				if (packetsearch && packetsearch.length) {

					packetsearch = packetsearch.map(v => v.toLowerCase());
					let values = Object.values(packetDetails).map(v => `${v}`.toLowerCase());

					let found = values.some(v => packetsearch.some(v2 => v.includes(v2)));
					if (!found)
						continue;
				}

				sendJson(ws, {
					cmd: 'newpacket',
					packet: packetDetails,
				});
			}

			sendJson(ws, {
				cmd: 'endloading',
			});
		}
		//else if(res.cmd === 'initialize_client'){
		//	require('./init_client-network')();
		//}
		//else if(res.cmd === 'sendpacket'){
		//	let i = res.Id;
		//	let buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
		//	
		//    enet.sendPacket(0, buffer, replayUnpacked[i].Channel);
		//}
		//else if(res.cmd === 'sendpacket_type'){
		//	const packet11 = createPacket(res.name, res.channel);
		//	packet11.partialKey = [ 0x2A, 0x00, 0xFF ];
		//	packet11.clientId = 0;
		//	packet11.playerId = 1;
		//	sendPacket(0, packet11);
		//}
		else if (res.cmd === 'sendpacket') {
			sendToGs({
				cmd: 'sendpacket',
				peerNums: res.peerNums,
				data: res.data,
				channel: res.channel,
			});
		}
		else if (res.cmd === 'loadreplaylist') {
			if (fs.existsSync(replayDir)) {
				let replayList = fs.readdirSync(replayDir).filter((value) => {
					return value.endsWith('.json') || value.endsWith('.lrpkt');
				});
				sendJson(ws, {
					cmd: 'loadreplaylist',
					list: replayList,
				});
			}
		}
		else if (res.cmd === 'loadreplayfile') {
			replayUnpacked = _replayreaders(replayDir + res.name);
		}
		else if (res.cmd === 'addpacket' || res.cmd === 'addpacketforall') {
			let packets = res.data;
			if (!Array.isArray(packets))
				packets = [packets];

			for (let i = 0; i < packets.length; i++) {
				let packet = packets[i] as {
					channel: number;
					data: string;
					time: number;
					peerNums: number[];
				};
				let packetChannel = packet.channel;
				let packetData = packet.data;

				if (!packetData)
					continue;

				let packetDataArray = packetData.split(' ').join('').match(/../g)?.map(h => parseInt(h, 16)) || [];

				let packetDetails: ReplayRecord = {
					channel: packetChannel,
					data: new Uint8Array(packetDataArray).buffer,
					time: packet.time || 1,
					peerNums: packet.peerNums,
				};

				let packetDetails2 = packetParser(packetDetails, ++pId);
				if (!packetDetails2)
					continue;

				if (res.cmd === 'addpacketforall')
					sendJsonToAll(wss, {
						cmd: 'newpacket',
						packet: packetDetails2,
					});
				else
					sendJson(ws, {
						cmd: 'newpacket',
						packet: packetDetails2,
					});
			}
		}
	});
});