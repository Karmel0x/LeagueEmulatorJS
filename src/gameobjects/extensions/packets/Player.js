
const loadingStages = require('../../../constants/loadingStages');
const TranslateCenteredCoordinates = require('../../../functions/TranslateCenteredCoordinates');
const UnitList = require('../../../app/UnitList');
const Server = require('../../../app/Server');
const Team = require('../traits/Team');
const PUnit = require('./Unit');

const createHeroDeath = {
	Alive: 0,
	Zombie: 1,
	Dead: 2
};


module.exports = class PPlayer extends PUnit {

	owner;
	/**
	 * 
	 * @param {import("../../units/Player")} owner 
	 */
	constructor(owner) {
		super(owner);
		this.owner = owner;
	}

	OnEnterLocalVisibilityClient() {
		this.charStats_send();
	}

	CreateHero(dest) {
		//todo

		const CreateHero = Server.network.createPacket('CreateHero');
		//CreateHero.netId = this.netId;
		CreateHero.netObjId = this.owner.netId;
		CreateHero.clientId = this.owner.clientId;
		CreateHero.netNodeId = 0;//0x40;
		CreateHero.skinId = 0;
		CreateHero.objectName = 'Test';
		CreateHero.skinName = this.owner.character.model;

		CreateHero.bitfield = {
			teamIsOrder: this.owner.team.id == Team.TEAM_BLUE,
			isBot: false
		};
		CreateHero.createHeroDeath = createHeroDeath.Alive;
		CreateHero.spawnPosIndex = this.owner.team.num;//2;

		dest.sendPacket(CreateHero, loadingStages.NOT_CONNECTED);
	}

	AvatarInfo_Server(dest) {
		//todo
		const AvatarInfo_Server = Server.network.createPacket('AvatarInfo_Server');
		AvatarInfo_Server.netId = this.owner.netId;
		AvatarInfo_Server.itemIds = [
			0,
			0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d,
			0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5,
			0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9,
			0x14d7, 0x14d7
		];
		AvatarInfo_Server.summonerIds = [0x0364af1c, 0x06496ea8];
		AvatarInfo_Server.summonerIds2 = AvatarInfo_Server.summonerIds;

		dest.sendPacket(AvatarInfo_Server, loadingStages.NOT_CONNECTED);
	}

	chatBoxMessage() {
		let message = Array.prototype.slice.call(arguments).join(' ');

		const Chat = Server.network.createPacket('Chat', 'COMMUNICATION');
		Chat.netId = this.owner.netId;
		Chat.msg = message;
		this.owner.packets.toSelf(Chat);
		console.debug(Chat);
	}

	SetCooldown(slot, cooldown = 0) {//return;
		const SetCooldown = Server.network.createPacket('SetCooldown', 'S2C');
		SetCooldown.netId = this.owner.netId;
		SetCooldown.slot = slot;
		SetCooldown.bitfield = {
			playVOWhenCooldownReady: false,
			isSummonerSpell: false,
		};
		SetCooldown.cooldown = cooldown;
		SetCooldown.maxCooldownForDisplay = cooldown;
		this.owner.packets.toSelf(SetCooldown);
		//console.log(SetCooldown);
	}

	// 497252 = root
	AddParticleTarget(packageHash, effectNameHash, boneNameHash = 497252, target = undefined) {
		const FX_Create_Group = Server.network.createPacket('FX_Create_Group', 'S2C');
		FX_Create_Group.netId = 0;//this.netId;
		FX_Create_Group.FXCreateGroupData = [];
		FX_Create_Group.FXCreateGroupData[0] = {
			packageHash: packageHash,
			effectNameHash: effectNameHash,
			flags: 32,
			targetBoneNameHash: 0,
			boneNameHash: boneNameHash,
		};
		FX_Create_Group.FXCreateGroupData[0].FXCreateData = [];
		FX_Create_Group.FXCreateGroupData[0].FXCreateData[0] = {
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

		FX_Create_Group.FXCreateGroupData[0].FXCreateData[0].position = ownerPositionCC;
		FX_Create_Group.FXCreateGroupData[0].FXCreateData[0].ownerPosition = ownerPositionCC;
		FX_Create_Group.FXCreateGroupData[0].FXCreateData[0].targetPosition = targetPositionCC;

		FX_Create_Group.FXCreateGroupData[0].FXCreateData[0].orientationVector = {
			x: 0,
			y: 0,
			z: 0,
		};

		FX_Create_Group.FXCreateGroupData[0].count = FX_Create_Group.FXCreateGroupData[0].FXCreateData.length;
		FX_Create_Group.count = FX_Create_Group.FXCreateGroupData.length;

		this.owner.packets.toVision(FX_Create_Group);
		//console.log(FX_Create_Group);
		//console.log(FX_Create_Group.FXCreateGroupData[0].FXCreateData);
	}
};
