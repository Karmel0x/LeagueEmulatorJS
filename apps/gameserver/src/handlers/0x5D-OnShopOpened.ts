
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.OnShopOpenedModel) => {
	console.log('handle: c2s.OnShopOpened');
	//console.log(packet);


};
