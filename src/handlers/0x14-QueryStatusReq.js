
import packets from '../packets/index.js';
import loadingStages from '../constants/loadingStages.js';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x14-QueryStatusReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.QueryStatusReq');
	//console.log(packet);

	{
		const packet1 = new packets.QueryStatusAns();
		packet1.response = true;
		player.packets.toSelf(packet1, loadingStages.NOT_CONNECTED);
	}
};
