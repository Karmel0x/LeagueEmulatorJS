
import { Vector2 } from '@repo/geometry';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import Server from '../app/server';
import loadingStages from '../constants/game-state';
import Game from '../game/initializers/game';
import { TeamId } from '../gameobjects/extensions/traits/team';
import type { Minion } from '../gameobjects/unit-ai';
import type Player from '../gameobjects/unit-ai/player';

let started = false;
export default (player: Player, packet: packets.ClientReadyModel) => {
	console.log('handle: c2s.ClientReady');
	//console.log(packet);

	//if (player.network.loadingStage >= loadingStages.inGame)
	//	return;

	player.network.loadingStage = loadingStages.inGame;
	Game.playerLoaded(player);

	const packet1 = packets.SwitchNexusesToOnIdleParticles.create({});
	player.network.sendPacket(packet1);

	if (player.owner.team.id === TeamId.order) {
		let blueUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id === TeamId.order);
		for (let i = 0, l = blueUnits.length; i < l; i++) {
			let unit = blueUnits[i];
			if (!unit) continue;

			Server.teams[TeamId.order]?.vision(unit, true);// todo
		}
	}

	if (player.owner.team.id === TeamId.chaos) {
		let redUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id === TeamId.chaos);
		for (let i = 0, l = redUnits.length; i < l; i++) {
			let unit = redUnits[i];
			if (!unit) continue;

			Server.teams[TeamId.chaos]?.vision(unit, true);// todo
		}
	}

	//@todo do not send it to everyone
	const seenUnitsByTeam = Server.movement.lastSeenUnitsByTeam;
	for (let teamId in seenUnitsByTeam) {
		let teamUnits = seenUnitsByTeam[teamId]!;

		let team = Server.teams[teamId];
		if (!team)
			continue;

		teamUnits.forEach(unit => {
			team.vision(unit, true);
		});
	}


	// test -------------------------------

	if (started)
		return;

	started = true;

	for (let i = 5; i > 0; i--) {
		const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
		if (!barrack) continue;

		const unit = barrack.spawnUnit(MinionType.melee);
		(unit.ai as Minion).moveLane = () => { };
		unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
	}

	for (let i = 5; i > 0; i--) {
		const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.order);
		if (!barrack) continue;

		const unit = barrack?.spawnUnit(MinionType.melee);
		(unit.ai as Minion).moveLane = () => { };
		unit?.moving.teleport(new Vector2(500, 1100 + (i * 150)));
	}

	const players = Server.players.map(player => player.ai as Player);

	players.forEach(player => {
		for (let i = 5; i > 0; i--) {
			player.owner.progress.levelUp();
			player.owner.progress.skillUpgrade(i % 4);
		}
	});

	players[1]?.owner.moving.teleport(new Vector2(1000 + (6 * 150), 600));
};
