
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.CheatLogGoldSourcesModel) => {
	console.log('handle: c2s.CheatLogGoldSources');
	//console.log(packet);


};
