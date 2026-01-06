
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import loadingStages from '../../constants/game-state';
import { humanizeMS } from '../../core/utils';
import type Fountain from '../../gameobjects/spawners/fountain';
import type Hero from '../../gameobjects/unit-ai/hero';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { sendUnitStats } from '../../packet-helpers/on-replication';
import { TeamId } from '../traits/team';


export default class PHero {

	declare readonly owner: Hero;

	constructor(owner: Hero) {
		this.owner = owner;
	}

	//toSelf(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
	//	this.owner.network.sendPacket(packet, minStage);
	//}

	OnEnterLocalVisibilityClient() {
		const ai = this.owner;
		const unit = ai.owner;
		sendUnitStats(unit);
	}

	CreateHero(dest: { sendPacket: Function }) {
		const ai = this.owner;
		const unit = ai.owner;

		//todo
		const packet1 = packets.CreateHero.create({
			//netId : this.netId,
			objectNetId: unit.netId,
			clientId: ai.clientId,
			netNodeId: 0x40,
			skillLevel: 0,
			teamIsOrder: unit.team.id === TeamId.order,
			isBot: false,
			botRank: 0,
			spawnPosIndex: ai.num,
			skinId: 0,
			name: ai.summoner?.name,
			skinName: unit.skin,
			//deathDurationRemaining: 0,
			//timeSinceDeath: 0,
			//createHeroDeath: DeathState.alive,
			//unknown1: false,
			//unknown2: false,
		});

		dest.sendPacket(packet1, loadingStages.notConnected);
	}

	AvatarInfo_Server(dest: { sendPacket: Function }) {
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

		dest.sendPacket(packet1, loadingStages.notConnected);
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

	chatBoxDebugMessage(...args: any[]) {
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
