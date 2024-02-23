
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../../constants/loading-stages';
import TranslateCenteredCoordinates from '@workspace/packets/packages/packets/functions/translate-centered-coordinates';
import UnitList from '../../../app/unit-list';
import Team, { TeamId } from '../traits/team';
import PUnit from './unit';
import Hero from '../../units/hero';
import { DeathState } from '@workspace/packets/packages/packets/base/s2c/0x4C-CreateHero';
import { sendUnitStats } from '../../../packet-helpers/OnReplication';


export default class PHero extends PUnit {

	declare owner: Hero;

	constructor(owner: Hero) {
		super(owner);
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

	// 497252 = root
	AddParticleTarget(packageHash: number, effectNameHash: number, boneNameHash = 497252, target = undefined) {

		let ownerPositionCC = TranslateCenteredCoordinates.to([this.owner.position])[0];
		let targetPositionCC = target ? TranslateCenteredCoordinates.to([target.position])[0] : ownerPositionCC;
		targetPositionCC.z = 0;// don't know if it's necessary to set z
		ownerPositionCC.z = 50;

		const packet1 = packets.FX_Create_Group.create({
			netId: 0,//this.netId;
			groupData: [{
				packageHash: packageHash,
				effectNameHash: effectNameHash,
				flags: 32,
				targetBoneNameHash: 0,
				boneNameHash: boneNameHash,
				createData: [{
					targetNetId: target?.netId || 0,//this.netId,
					netAssignedNetId: ++UnitList.lastNetId,//?
					casterNetId: 0,//this.netId,
					bindNetId: this.owner.netId,
					keywordNetId: 0,//this.netId,
					timeSpent: 0,
					scriptScale: 1,
					position: ownerPositionCC,
					ownerPosition: ownerPositionCC,
					targetPosition: targetPositionCC,
					orientationVector: {
						x: 0,
						y: 0,
						z: 0,
					},
				}],
			}],
		});

		this.owner.packets.toVision(packet1);
		//console.log(packet1);
		//console.log(packet1.FXCreateGroupData[0].FXCreateData);
	}
}
