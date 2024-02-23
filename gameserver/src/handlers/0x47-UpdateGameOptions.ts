
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.UpdateGameOptionsModel) => {
	console.log('handle: c2s.UpdateGameOptions');
	//console.log(packet);

	player.combat.autoAttackToggle = packet.autoAttackEnabled;
};
