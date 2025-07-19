
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import loadingStages from '../../../constants/game-state';
import { humanizeMS } from '../../../core/utils';
import { sendUnitStats } from '../../../packet-helpers/on-replication';
import type Fountain from '../../spawners/fountain';
import type Hero from '../../unit-ai/hero';
import type AttackableUnit from '../../units/attackable-unit';
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
		sendUnitStats(this.owner.owner);
	}

	CreateHero(dest: { sendPacket: Function }) {
		//todo

		const packet1 = packets.CreateHero.create({
			//netId : this.netId,
			objectNetId: this.owner.owner.netId,
			clientId: this.owner.clientId,
			netNodeId: 0x40,
			skillLevel: 0,
			teamIsOrder: this.owner.owner.team.id === TeamId.order,
			isBot: false,
			botRank: 0,
			spawnPosIndex: this.owner.num,
			skinId: 0,
			name: this.owner.summoner?.name,
			skinName: this.owner.owner.skin,
			//deathDurationRemaining: 0,
			//timeSinceDeath: 0,
			//createHeroDeath: DeathState.alive,
			//unknown1: false,
			//unknown2: false,
		});

		dest.sendPacket(packet1, loadingStages.notConnected);
	}

	AvatarInfo_Server(dest: { sendPacket: Function }) {
		//todo
		const packet1 = packets.AvatarInfo_Server.create({
			netId: this.owner.owner.netId,
			itemIds: [],
			summonerIds: [
				this.owner.summonerSpells[0]!.spellHash,
				this.owner.summonerSpells[1]!.spellHash,
			],
			talents: [],
			level: 1,
		});

		dest.sendPacket(packet1, loadingStages.notConnected);
	}

	chatBoxMessage(message: string) {
		const packet1 = packets.Chat.create({
			//netId: this.owner.netId,
			clientId: this.owner.clientId,
			message,
		});
		this.owner.owner.packets.toSelf(packet1);
	}

	chatBoxDebugMessage(...args: any[]) {
		const argsStr = args.map((a) => typeof a === 'string' ? a : JSON.stringify(a));

		let message = argsStr.join(' ');
		message = `[${humanizeMS(performance.now())}] ` + message;

		this.chatBoxMessage(message);
	}

	skillUpgrade_send(slot: number) {
		const packet1 = packets.UpgradeSpellAns.create({
			netId: this.owner.owner.netId,
			slot: slot,
			level: this.owner.owner.progress.spellLevel[slot],
			pointsLeft: this.owner.owner.progress.skillPoints,
		});
		this.owner.owner.packets.toSelf(packet1);
		//console.debug(packet1);
	}

	setCooldown(slot: number, cooldown = 0) {//return;
		const packet1 = packets.SetCooldown.create({
			netId: this.owner.owner.netId,
			slot,
			//playVOWhenCooldownReady: false,
			isSummonerSpell: false,
			cooldown,
			//maxCooldownForDisplay: cooldown,
		});
		this.owner.owner.packets.toSelf(packet1);
		//console.log(packet1);
	}

	Die(source: AttackableUnit) {
		const unit = this.owner.owner;
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
		this.owner.owner.packets.toEveryone(packet1);
	}

}
