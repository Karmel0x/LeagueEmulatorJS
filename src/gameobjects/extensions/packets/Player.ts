
import packets from '../../../packets/index';
import loadingStages from '../../../constants/loadingStages';
import TranslateCenteredCoordinates from '../../../functions/TranslateCenteredCoordinates';
import UnitList from '../../../app/UnitList';
import Team from '../traits/Team';
import PUnit from './Unit';
import Player from '../../units/Player';

const createHeroDeath = {
	Alive: 0,
	Zombie: 1,
	Dead: 2
};


export default class PPlayer extends PUnit {

	owner;

	constructor(owner: Player) {
		super(owner);
		this.owner = owner;
	}

	OnEnterLocalVisibilityClient() {
		this.charStats_send();
	}

	CreateHero(dest) {
		//todo

		const packet1 = new packets.CreateHero();
		//packet1.netId = this.netId;
		packet1.netObjId = this.owner.netId;
		packet1.clientId = this.owner.clientId;
		packet1.netNodeId = 0;//0x40;
		packet1.skinId = 0;
		packet1.objectName = 'Test';
		packet1.skinName = this.owner.character.model;

		packet1.bitfield = {
			teamIsOrder: this.owner.team.id == Team.TEAM_BLUE,
			isBot: false
		};
		packet1.createHeroDeath = createHeroDeath.Alive;
		packet1.spawnPosIndex = this.owner.team.num;//2;

		dest.sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	AvatarInfo_Server(dest) {
		//todo
		const packet1 = new packets.AvatarInfo_Server();
		packet1.netId = this.owner.netId;
		packet1.itemIds = [
			0,
			0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d,
			0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5,
			0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9,
			0x14d7, 0x14d7
		];
		packet1.summonerIds = [0x0364af1c, 0x06496ea8];
		packet1.summonerIds2 = packet1.summonerIds;

		dest.sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	chatBoxMessage(...args: any[]) {
		let message = args.join(' ');

		const packet1 = new packets.Chat();
		packet1.netId = this.owner.netId;
		packet1.msg = message;
		this.owner.packets.toSelf(packet1);
		console.debug(packet1);
	}

	SetCooldown(slot, cooldown = 0) {//return;
		const packet1 = new packets.SetCooldown();
		packet1.netId = this.owner.netId;
		packet1.slot = slot;
		packet1.bitfield = {
			playVOWhenCooldownReady: false,
			isSummonerSpell: false,
		};
		packet1.cooldown = cooldown;
		packet1.maxCooldownForDisplay = cooldown;
		this.owner.packets.toSelf(packet1);
		//console.log(packet1);
	}

	// 497252 = root
	AddParticleTarget(packageHash, effectNameHash, boneNameHash = 497252, target = undefined) {
		const packet1 = new packets.FX_Create_Group();
		packet1.netId = 0;//this.netId;
		packet1.FXCreateGroupData = [];
		packet1.FXCreateGroupData[0] = {
			packageHash: packageHash,
			effectNameHash: effectNameHash,
			flags: 32,
			targetBoneNameHash: 0,
			boneNameHash: boneNameHash,
		};
		packet1.FXCreateGroupData[0].FXCreateData = [];
		packet1.FXCreateGroupData[0].FXCreateData[0] = {
			targetNetId: target?.netId || 0,//this.netId,
			netAssignedNetId: ++UnitList.lastNetId,//?
			casterNetId: 0,//this.netId,
			bindNetId: this.owner.netId,
			keywordNetId: 0,//this.netId,
			timeSpent: 0,
			scriptScale: 1,
		};

		let ownerPositionCC = TranslateCenteredCoordinates.to([this.owner.position])[0];
		let targetPositionCC = target ? TranslateCenteredCoordinates.to([target.position])[0] : ownerPositionCC;
		targetPositionCC.z = 0;// don't know if it's necessary to set z
		ownerPositionCC.z = 50;

		packet1.FXCreateGroupData[0].FXCreateData[0].position = ownerPositionCC;
		packet1.FXCreateGroupData[0].FXCreateData[0].ownerPosition = ownerPositionCC;
		packet1.FXCreateGroupData[0].FXCreateData[0].targetPosition = targetPositionCC;

		packet1.FXCreateGroupData[0].FXCreateData[0].orientationVector = {
			x: 0,
			y: 0,
			z: 0,
		};

		packet1.FXCreateGroupData[0].count = packet1.FXCreateGroupData[0].FXCreateData.length;
		packet1.count = packet1.FXCreateGroupData.length;

		this.owner.packets.toVision(packet1);
		//console.log(packet1);
		//console.log(packet1.FXCreateGroupData[0].FXCreateData);
	}
}
