
import { PingCategory } from '@repo/packets/base/s2c/0x40-MapPing';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import type Player from '../gameobjects/unit-ai/player';
import AttackableUnit from '../gameobjects/units/attackable-unit';

export default (player: Player, packet: packets.SendSelectedObjIdModel) => {
	console.log('handle: c2s.SendSelectedObjId');
	//console.log(packet);

	if (!packet.selectedNetId)
		return;

	// test
	let unit = GameObjectList.objectByNetId[packet.selectedNetId];
	if (!unit) {
		player.packets.chatBoxDebugMessage('selected not existing object');
		return;
	}

	const owner = player.owner;

	if (unit instanceof AttackableUnit) {
		let characterName = unit.character?.name;
		let distance = Math.round(owner.distanceTo(unit) * 1e3) / 1e3;
		player.packets.chatBoxDebugMessage('selected unit', characterName, unit.netId, unit.position, 'distance:', distance);
	}
	else {
		let distance = Math.round(owner.distanceTo(unit) * 1e3) / 1e3;
		player.packets.chatBoxDebugMessage('selected object', unit.netId, unit.position, 'distance:', distance);
	}

	player.lastSelectedNetId = packet.selectedNetId;

	//sendUnitParticle(player.owner, [{
	//	effectNameHash: "DebugCircle_green.troy",
	//	createData: [{
	//		bindNetId: 0,
	//		positionNCC: unit.position,
	//	}],
	//}]);

	//const packet1 = packets.AddDebugCircle.create({
	//	netId: player.owner.netId,
	//	id: 1,
	//	unitNetId: player.owner.netId,
	//	center: {
	//		z: 50,
	//		...unit.position,
	//	},
	//	radius: 500,
	//	color: 100,
	//});
	//player.owner.packets.toVision(packet1);

	const packet1 = packets.MapPing.create({
		position: unit.position,
		//targetNetId: packet.targetNetId,
		sourceNetId: owner.netId,
		category: PingCategory.command,
		playAudio: false,
		showChat: false,
		throttled: false,
	});
	player.owner.packets.toTeam(packet1);
};
