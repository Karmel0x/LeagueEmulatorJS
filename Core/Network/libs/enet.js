
const Network = require('../Network');
const enet = require('../../../../enetcppjs');

class NetworkEnet extends Network {

	async netLoop(){
		while(true){
			var msg = enet.netLoop();
			if(typeof msg.type == 'undefined'){//no packets atm
				await Promise.wait(1);//don't overload cpu
				continue;
			}

			if(msg.type == enet.ENET_EVENT_TYPE_RECEIVE){
				this.onPacketReceived(msg);
			}
		}
	}
	
	listen(){
		var enet_initialize = enet.initialize(this.port, this.host, this.blowfishKey);
		enet_initialize = Boolean(enet_initialize);

		console.log('enet_initialize:', enet_initialize);
		if(!enet_initialize)
			return false;
		
		this.netLoop();
		return true;
	}

	sendPacketMsg(msg){
		enet.sendPacket(msg.peer_num, msg.buffer, msg.channel);
	}
}

module.exports = NetworkEnet;
