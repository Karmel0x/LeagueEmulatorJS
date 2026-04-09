
import { PingCategory } from '@repo/packets/base/s2c/0x40-MapPing';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import Server from '../app/server';
import { humanizeDecimal, humanizePosition } from '../core/utils';
import config from '../game/game.config';
import type Player from '../gameobjects/unit-ai/player';
import AttackableUnit from '../gameobjects/units/attackable-unit';

export default (player: Player, packet: packets.SendSelectedObjIdModel) => {
	console.log('handle: c2s.SendSelectedObjId');
	//console.log(packet);

	if (!packet.selectedNetId)
		return;

	player.lastSelectedNetId = packet.selectedNetId;
	Server.lastSelectedNetId = packet.selectedNetId;

	if (config.debugging) {
		let unit = GameObjectList.objectByNetId[packet.selectedNetId];
		if (!unit) {
			player.packets.chatBoxDebugMessage('selected not existing object');
			return;
		}

		const owner = player.owner;

		if (config.debugging.chatDebugMessages) {
			if (unit instanceof AttackableUnit) {
				let unitName = unit.name;
				let characterName = unit.character?.name;
				let distance = humanizeDecimal(owner.distanceTo(unit));
				player.packets.chatBoxDebugMessage('selected unit', unitName, characterName, unit.netId, humanizePosition(unit.position), 'distance:', distance);
			}
			else {
				let distance = humanizeDecimal(owner.distanceTo(unit));
				player.packets.chatBoxDebugMessage('selected object', unit.netId, humanizePosition(unit.position), 'distance:', distance);
			}
		}

		//sendUnitParticle(owner, [{
		//	effectNameHash: "DebugCircle_green.troy",
		//	createData: [{
		//		bindNetId: 0,
		//		positionNCC: unit.position,
		//	}],
		//	createData: [],
		//}]);
		//
		//const packet1 = packets.AddDebugCircle.create({
		//	netId: owner.netId,
		//	id: 1,
		//	unitNetId: owner.netId,
		//	center: {
		//		z: 50,
		//		...unit.position,
		//	},
		//	radius: 500,
		//	color: 100,
		//});
		//owner.packets.toVision(packet1);

		const packet1 = packets.MapPing.create({
			position: unit.position,
			//targetNetId: packet.targetNetId,
			sourceNetId: owner.netId,
			category: PingCategory.command,
			playAudio: false,
			showChat: false,
			throttled: false,
		});
		owner.packets.toTeam(packet1);
	}
};
