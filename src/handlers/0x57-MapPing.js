
import packets from '../packets/index.js';
import { Vector2 } from 'three';
import UnitList from '../app/UnitList.js';
import Team from '../gameobjects/extensions/traits/Team.js';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x57-MapPing.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.MapPing');
	//console.log(packet);


	{
		const packet1 = new packets.MapPing();
		packet1.position = packet.position;
		packet1.targetNetId = packet.targetNetId;
		packet1.sourceNetId = player.netId;
		packet1.pingCategory = packet.pingCategory;
		packet1.bitfield = {//0xFB
			playAudio: true,
			showChat: true,
			pingThrottled: false,
			playVO: true,
		};
		player.packets.toTeam(packet1);
	}

	//test
	let pos = new Vector2(packet.position.x, packet.position.y);
	let redMinionUnits = /** @type {import("../gameobjects/units/Minion")[]} */ (/** @type {*} */(UnitList.getUnitsF(Team.TEAM_RED, 'Minion')));
	redMinionUnits[0]?.moving.move1(pos);

};
