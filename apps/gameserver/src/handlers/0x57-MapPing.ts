
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import { Vector2 } from 'three';
import { TeamId } from '../gameobjects/extensions/traits/team';
import Minion from '../gameobjects/units/minion';
import GameObjectList from '../app/game-object-list';


export default (player: Player, packet: packets.MapPingModel) => {
	console.log('handle: c2s.MapPing');
	//console.log(packet);


	{
		const packet1 = packets.MapPing.create({
			position: packet.position,
			targetNetId: packet.targetNetId,
			sourceNetId: player.netId,
			category: packet.category,
			playAudio: true,
			showChat: true,
			throttled: false,
			playVO: true,
		});
		player.packets.toTeam(packet1);
	}

	//test
	let pos = new Vector2(packet.position.x, packet.position.y);
	let redMinion = GameObjectList.aliveUnits.find(unit => unit instanceof Minion && unit.team.id == TeamId.chaos) as Minion | undefined;
	redMinion?.moving.move1(pos);

};
