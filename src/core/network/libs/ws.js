//
//import Network from '../Network.js';
//import WebSocket, { WebSocketServer } from 'ws';
//
//
//class NetworkWs extends Network {
//
//	peerNumIndex = 0;
//
//	/**
//	 * @type {Object.<number, WebSocket>}
//	 */
//	peers = {};
//
//	listen() {
//		const wss = new WebSocketServer({ port: this.port, host: this.host });
//
//		wss.on('connection', (ws) => {
//			const peerNum = this.peerNumIndex++;
//			this.peers[peerNum] = ws;
//
//			ws.on('message', (data) => {
//				/**
//				 * @type {PacketMessage}
//				 */
//				let msg = {
//					peerNum: peerNum,
//					channel: 1,//C2S // channels should not exists here
//					buffer: data,
//				};
//				this.onPacketReceived(msg);
//			});
//		});
//	}
//
//	/**
//	 * @param {PacketMessage} msg
//	 */
//	sendPacketMsg(msg) {
//		this.peers[msg.peerNum].send(msg.buffer);
//	}
//}
//
//export default NetworkWs;
//