
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.TutorialAudioEventFinishedModel) => {
	console.log('handle: c2s.TutorialAudioEventFinished');
	//console.log(packet);


};
