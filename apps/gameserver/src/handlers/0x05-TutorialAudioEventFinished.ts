
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.TutorialAudioEventFinishedModel) => {
	console.log('handle: c2s.TutorialAudioEventFinished');
	//console.log(packet);


};
