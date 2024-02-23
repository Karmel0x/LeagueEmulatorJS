
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.UpgradeSpellReqModel) => {
	console.log('handle: c2s.UpgradeSpellReq');
	//console.log(packet);


	player.progress.skillUpgrade(packet.slot, packet.isEvolve);
};
