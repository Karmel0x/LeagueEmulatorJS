
import { Vector2 } from '@repo/geometry';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import { TeamId } from '../gameobjects/extensions/traits/team';
import Minion from '../gameobjects/unit-ai/minion';
import Player from '../gameobjects/unit-ai/player';
import AttackableUnit from '../gameobjects/units/attackable-unit';


export default (player: Player, packet: packets.MapPingC2SModel) => {
	console.log('handle: c2s.MapPing');
	//console.log(packet);


	{
		const owner = player.owner;
		const packet1 = packets.MapPing.create({
			position: packet.position,
			targetNetId: packet.targetNetId,
			sourceNetId: owner.netId,
			category: packet.category,
			playAudio: true,
			showChat: true,
			throttled: false,
			//playVO: true,
		});
		player.owner.packets.toTeam(packet1);
	}

	//test
	let pos = new Vector2(packet.position.x, packet.position.y);
	let redMinion = GameObjectList.aliveUnits.find(unit => unit.ai instanceof Minion && unit.team.id === TeamId.chaos) as AttackableUnit | undefined;
	redMinion?.moving.setWaypoints([pos]);

};
