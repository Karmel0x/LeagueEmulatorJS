
const loadingStages = require('../../Constants/loadingStages');

/**
 * 
 * @class
 * @param {Player} I
 */
module.exports = (I) => class INetwork extends I {

	peer_num = -1;

	sendPacket(packet, minStage = loadingStages.IN_GAME){
		if(this.loadingStage < minStage)
			return;
		
		//if(this.packetBatching)
		//    this.batchPackets.push(packet);
		//else
			global.Network.sendPacket([this.peer_num], packet);
	}


	sendReconnectPackets(){
		global.Players.forEach(player => {
			player.CreateHero(this);
			player.AvatarInfo_Server(this);
		});
	}
	
	//_storePacket = [];
	//storePacket(packet){
	//	this._storePacket.push(packet);
	//}
	//restorePackets(){
	//	console.log('restorePackets', this._storePacket);
	//	while(this._storePacket.length){
	//		var packet = this._storePacket.shift();
	//		sendPacketS([this.peer_num], packet.channel, packet.buffer);
	//	}
	//}
	//todo: packet batching
	//packetBatching = false;
	//batchedPackets = [];
	//batch_begin(){
	//    this.packetBatching = true;
	//}
	//batch_end(){
	//    this.packetBatching = false;
	//    var packet = {};
	//    packet.packets = this.batchedPackets;
	//    this.batchedPackets = [];
	//    //todo: create batchet packet
	//    sendPacket(this.peer_num, packet);
	//}

};
