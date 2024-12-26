
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.OnTutorialPopupClosedModel) => {
	console.log('handle: c2s.OnTutorialPopupClosed');
	//console.log(packet);


};
