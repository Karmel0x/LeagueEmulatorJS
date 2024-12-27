
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.UpdateGameOptionsModel) => {
	console.log('handle: c2s.UpdateGameOptions');
	//console.log(packet);

	const owner = player.owner;
	owner.combat.autoAttackToggle = packet.autoAttackEnabled;

};
