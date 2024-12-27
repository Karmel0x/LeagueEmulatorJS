
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.UpgradeSpellReqModel) => {
	console.log('handle: c2s.UpgradeSpellReq');
	//console.log(packet);

	const owner = player.owner;
	owner.progress.skillUpgrade(packet.slot, packet.isEvolve);

};
