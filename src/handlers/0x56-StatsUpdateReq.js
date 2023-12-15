
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x56-StatsUpdateReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.StatsUpdateReq');
	//console.log(packet);


	//const packet1 = new packets.StatsUpdateReq?();
	//player.network.sendPacket(packet1?);

	//player.network.loadingStage = true;
};
