
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.OnShopOpenedModel) => {
	console.log('handle: c2s.OnShopOpened');
	//console.log(packet);


};
