
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../../constants/loading-stages';
import { TeamId } from '../traits/team';
import PUnit from './unit';
import Hero from '../../units/hero';
import { DeathState } from '@workspace/packets/packages/packets/base/s2c/0x4C-CreateHero';
import { sendUnitStats } from '../../../packet-helpers/OnReplication';
import { PacketMessage } from '@workspace/network/packages/packets/packet';


export default class PHero extends PUnit {

	declare owner: Hero;

	constructor(owner: Hero) {
		super(owner);
	}

	toSelf(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		this.owner.network.sendPacket(packet, minStage);
	}

	OnEnterLocalVisibilityClient() {
		sendUnitStats(this.owner);
	}

	CreateHero(dest: { sendPacket: Function }) {
		//todo

		const packet1 = packets.CreateHero.create({
			//netId : this.netId,
			objectNetId: this.owner.netId,
			clientId: this.owner.clientId,
			netNodeId: 0,//0x40;
			skillLevel: 0,
			teamIsOrder: this.owner.team.id == TeamId.order,
			isBot: false,
			botRank: 0,
			spawnPosIndex: this.owner.team.num,//2;
			skinId: 0,
			name: 'Test',
			skinName: this.owner.character.model,
			deathDurationRemaining: 0,
			timeSinceDeath: 0,
			createHeroDeath: DeathState.alive,
			unknown1: false,
			unknown2: false,
		});

		dest.sendPacket(packet1, loadingStages.notConnected);
	}

	AvatarInfo_Server(dest: { sendPacket: Function }) {
		//todo
		const packet1 = packets.AvatarInfo_Server.create({
			netId: this.owner.netId,
			itemIds: [
				0,
				0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d,
				0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5,
				0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9,
				0x14d7, 0x14d7
			],
			summonerIds: [0x0364af1c, 0x06496ea8],
			summonerIds2: [0x0364af1c, 0x06496ea8],
			talents: [],
			level: 1,
			wardSkin: 0,
		});

		dest.sendPacket(packet1, loadingStages.notConnected);
	}

	chatBoxMessage(...args: any[]) {
		let message = args.join(' ');

		const packet1 = packets.Chat.create({
			netId: this.owner.netId,
			message,
		});
		this.owner.packets.toSelf(packet1);
		console.debug(packet1);
	}

	skillUpgrade_send(slot: number) {
		const packet1 = packets.UpgradeSpellAns.create({
			netId: this.owner.netId,
			slot: slot,
			level: this.owner.progress.spellLevel[slot],
			pointsLeft: this.owner.progress.skillPoints,
		});
		this.owner.packets.toSelf(packet1);
		//console.debug(packet1);
	}

	SetCooldown(slot: number, cooldown = 0) {//return;
		const packet1 = packets.SetCooldown.create({
			netId: this.owner.netId,
			slot: slot,
			playVOWhenCooldownReady: false,
			isSummonerSpell: false,
			cooldown: cooldown,
			maxCooldownForDisplay: cooldown,
		});
		this.owner.packets.toSelf(packet1);
		//console.log(packet1);
	}

}
