
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';

import { Vector2 } from 'three';
import UnitList from '../app/unit-list';
import Team, { TeamId } from '../gameobjects/extensions/traits/team';
import Minion from '../gameobjects/units/minion';


export default (player: Player, packet: packets.MapPingModel) => {
	console.log('handle: c2s.MapPing');
	//console.log(packet);


	{
		const packet1 = packets.MapPing.create({
			position: packet.position,
			targetNetId: packet.targetNetId,
			sourceNetId: player.netId,
			pingCategory: packet.pingCategory,
			playAudio: true,
			showChat: true,
			pingThrottled: false,
			playVO: true,
		});
		player.packets.toTeam(packet1);
	}

	//test
	let pos = new Vector2(packet.position.x, packet.position.y);
	let redMinionUnits = UnitList.getUnitsF(TeamId.chaos, 'Minion') as Minion[];
	redMinionUnits[0]?.moving.move1(pos);

};
