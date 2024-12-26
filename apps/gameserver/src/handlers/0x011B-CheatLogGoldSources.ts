
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.CheatLogGoldSourcesModel) => {
	console.log('handle: c2s.CheatLogGoldSources');
	//console.log(packet);


};
