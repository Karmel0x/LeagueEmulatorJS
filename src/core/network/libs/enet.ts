
import Network from '../Network';
//import PacketMessage from '../PacketMessage';

import enet from '../../../../../enetcppjs/index2';
import { PacketMessage } from '../../Core';


class NetworkEnet extends Network {

	async netLoop() {
		for (; ;) {
			let msg = enet.netLoop_arrayBuffer();
			if (typeof msg.type === 'undefined') {//no packets atm
				await Promise.wait(1);//don't overload cpu
				continue;
			}

			if (msg.type == enet.ENET_EVENT_TYPE_RECEIVE) {
				this.onPacketReceived(msg);
			}
		}
	}

	listen() {
		let enetInitialize = enet.initialize(this.port, this.host, this.blowfishKey);

		console.log('enetInitialize:', enetInitialize);
		if (!enetInitialize)
			throw new Error('enetInitialize failed');

		this.netLoop();
	}

	sendPacketMsg(msg: PacketMessage) {
		//console.log(msg);
		//console.log(msg.channel, ':', msg.buffer);
		enet.sendPacket_arrayBuffer(msg.peerNum, msg.buffer, msg.channel);
	}
}

export default NetworkEnet;
