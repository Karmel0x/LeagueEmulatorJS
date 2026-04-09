
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import { humanizeMS } from '../../core/utils';
import config from '../../game/game.config';
import type Fountain from '../../gameobjects/spawners/fountain';
import type Hero from '../../gameobjects/unit-ai/hero';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { TeamId } from '../traits/team';


export default class PHero {

	declare readonly owner: Hero;

	constructor(owner: Hero) {
		this.owner = owner;
	}

	//toSelf(packet: PacketMessages, minStage = loadingStages.inGame) {
	//	this.owner.network.sendPacket(packet, minStage);
	//}

	OnEnterLocalVisibilityClient() { }

	sendOnEnterLocalVisibilityClient() {
		const ai = this.owner;
		const unit = ai.owner;
		unit.markReplicateStats();
	}

	CreateHero() {
		const ai = this.owner;
		const unit = ai.owner;

		//todo
		const packet1 = packets.CreateHero.create({
			//netId: this.netId,
			objectNetId: unit.netId,
			clientId: ai.clientId,
			netNodeId: 0x40,
			skillLevel: 0,
			teamIsOrder: unit.team.id === TeamId.order,
			isBot: false,
			botRank: 0,
			spawnPosIndex: ai.num,
			skinId: 0,
			name: unit.name,
			skinName: unit.skin,
			//deathDurationRemaining: 0,
			//timeSinceDeath: 0,
			//createHeroDeath: DeathState.alive,
			//unknown1: false,
			//unknown2: false,
		});

		return packet1;
	}

	AvatarInfo_Server() {
		const ai = this.owner;
		const unit = ai.owner;

		//todo
		const packet1 = packets.AvatarInfo_Server.create({
			netId: unit.netId,
			itemIds: [],
			summonerIds: [
				ai.summonerSpells[0]!.spellHash,
				ai.summonerSpells[1]!.spellHash,
			],
			talents: [],
			level: 1,
		});

		return packet1;
	}

	chatBoxMessage(message: string) {
		const ai = this.owner;
		const unit = ai.owner;

		const packet1 = packets.Chat.create({
			//netId: ai.netId,
			clientId: ai.clientId,
			message,
		});
		unit.packets.toSelf(packet1);
	}

	chatBoxMessage2(...args: any[]) {
		const argsStr = args.map((a) => typeof a === 'string' ? a : JSON.stringify(a));

		let message = argsStr.join(' ');
		this.chatBoxMessage(message);
	}

	chatBoxDebugMessage(...args: any[]) {
		if (!config.debugging.enabled || !config.debugging.chatDebugMessages)
			return;

		const argsStr = args.map((a) => typeof a === 'string' ? a : JSON.stringify(a));

		let message = argsStr.join(' ');
		message = `[${humanizeMS(performance.now())}] ` + message;

		this.chatBoxMessage(message);
	}

	skillUpgrade_send(slot: number) {
		const ai = this.owner;
		const unit = ai.owner;

		const packet1 = packets.UpgradeSpellAns.create({
			netId: unit.netId,
			slot: slot,
			level: unit.progress.spellLevel[slot],
			pointsLeft: unit.progress.skillPoints,
		});
		unit.packets.toSelf(packet1);
		//console.debug(packet1);
	}

	setCooldown(slot: number, cooldown = 0) {//return;
		const ai = this.owner;
		const unit = ai.owner;

		const packet1 = packets.SetCooldown.create({
			netId: unit.netId,
			slot,
			//playVOWhenCooldownReady: false,
			isSummonerSpell: false,
			cooldown,
			//maxCooldownForDisplay: cooldown,
		});
		unit.packets.toSelf(packet1);
		//console.log(packet1);
	}

	Die(source: AttackableUnit) {
		const ai = this.owner;
		const unit = ai.owner;
		const spawner = unit.spawner as Fountain;
		if (!spawner) return;

		const deathDuration = spawner.getDeathDuration(unit);

		const packet1 = packets.Hero_Die.create({
			netId: unit.netId,
			killerNetId: source.netId,
			damageType: DamageType.physical,
			damageSource: DamageSource.attack,
			deathDuration,
			becomeZombie: false,
		});
		unit.packets.toEveryone(packet1);
	}

}
