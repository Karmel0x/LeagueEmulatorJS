
import { Vector2 } from '@repo/geometry';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import Server from '../app/server';
import loadingStages from '../constants/game-state';
import config from '../game/game.config';
import Game from '../game/initializers/game';
import { TeamId } from '../gameobjectextensions/traits/team';
import type { LaneMinion } from '../gameobjects/unit-ai';
import type Player from '../gameobjects/unit-ai/player';


function debugPerform() {
	if (!config.testing.enabled)
		return;

	let olpi = 0;
	let clpi = 0;

	if (config.testing.spawnMinionsLine) {
		for (let i = config.testing.spawnMinionsLine; i > 0; i--) {
			const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.order);
			if (!barrack) continue;

			const unit = barrack.spawnUnit(MinionType.melee);
			(unit.ai as LaneMinion).moveNextLanePoint = () => { };
			unit.combat.autoAttackToggle = false;
			unit.stats.acquisitionRange.baseValue = 175;
			unit.moving.teleport(new Vector2(500, 1300 + (olpi * 150)));
			olpi++;
		}

		for (let i = config.testing.spawnMinionsLine; i > 0; i--) {
			const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
			if (!barrack) continue;

			const unit = barrack.spawnUnit(MinionType.melee);
			(unit.ai as LaneMinion).moveNextLanePoint = () => { };
			unit.combat.autoAttackToggle = false;
			unit.stats.acquisitionRange.baseValue = 175;
			unit.moving.teleport(new Vector2(1200 + (clpi * 150), 600));
			clpi++;
		}
	}

	const players = Server.players;

	if (config.testing.bringHeroesToLine) {
		const playersWoFirst = players.slice(1);

		const orderPlayers = playersWoFirst.filter(unit => unit.team.id === TeamId.order);
		orderPlayers.forEach(unit => {
			unit.moving.teleport(new Vector2(500, 1300 + (olpi * 150)));
			olpi++;
		});

		const chaosPlayers = playersWoFirst.filter(unit => unit.team.id === TeamId.chaos);
		chaosPlayers.forEach(unit => {
			unit.moving.teleport(new Vector2(1200 + (clpi * 150), 550));
			clpi++;
		});
	}

	players.forEach(unit => {
		if (config.testing.levelUpPlayers) {
			const levelExp = Server.map.expCurve[config.testing.levelUpPlayers]!;
			unit.progress.expUp(levelExp);

			for (let i = 0; i <= config.testing.levelUpPlayers; i++) {
				unit.progress.skillUpgrade(i % 4);
			}
		}

		if (config.testing.noCooldowns) {
			unit.stats.cooldownMod.baseValue = -1;
			unit.stats.cooldownMod.minTotal = -1;
		}

		if (config.testing.noManaCosts) {
			unit.stats.manaCostReduction.baseValue = -1;
			unit.stats.manaCostReduction.minTotal = -1;
		}

		if (config.testing.noHeroDying) {
			unit.stats.health.minimum = 1;
		}
	});
}

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
			let unit = blueUnits[i]!;
			Server.teams[TeamId.order]?.vision(unit, true);// todo
		}
	}

	if (player.owner.team.id === TeamId.chaos) {
		let redUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id === TeamId.chaos);
		for (let i = 0, l = redUnits.length; i < l; i++) {
			let unit = redUnits[i]!;
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

	if (Server.game.admitted)
		return;

	const now = Server.gameLoop.timer;
	Server.game.admitted = now;
	debugPerform();
};
