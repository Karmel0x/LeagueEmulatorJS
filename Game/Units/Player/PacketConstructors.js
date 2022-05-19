const PacketConstructorsUnit = require('../Unit/PacketConstructors');

const {createPacket, sendPacket, sendPacketS} = require("../../../Core/PacketUtilities");

const loadingStages = require('../../../Constants/loadingStages');
const CreateHeroDeath = {
	Alive: 0,
	Zombie: 1,
	Dead: 2
};


class PacketConstructorsPlayer extends PacketConstructorsUnit {
	HERO_SPAWN(dest = global.Teams['ALL']){
		//todo
		
		var HERO_SPAWN = createPacket('HERO_SPAWN');
		//HERO_SPAWN.netId = this.parent.netId;
		HERO_SPAWN.NetId = this.parent.netId;
		HERO_SPAWN.ClientID = this.parent._PlayerInfo.ClientID;
		HERO_SPAWN.NetNodeID = 0;//0x40;
		HERO_SPAWN.SkinID = 0;
		HERO_SPAWN.Name = 'Test';//playerName
		HERO_SPAWN.Skin = this.parent.character.name;//modelName

		HERO_SPAWN.bitfield = {
			TeamIsOrder: this.parent.info.team == 'BLUE',
			IsBot: false
		};
		HERO_SPAWN.CreateHeroDeath = CreateHeroDeath.Alive;
		HERO_SPAWN.SpawnPositionIndex = 0;//2;

		dest.sendPacket(HERO_SPAWN, loadingStages.NOT_CONNECTED);
	}
	AVATAR_INFO(dest = global.Teams['ALL']){
		//todo
		var AVATAR_INFO = createPacket('AVATAR_INFO');
		AVATAR_INFO.netId = this.parent.netId;
		AVATAR_INFO.ItemIDs = [
			0,
			0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d,
			0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5,
			0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9,
			0x14d7, 0x14d7
		];
		AVATAR_INFO.SummonerIDs = [0x0364af1c, 0x06496ea8];
		AVATAR_INFO.SummonerIDs2 = AVATAR_INFO.SummonerIDs;
		
		dest.sendPacket(AVATAR_INFO, loadingStages.NOT_CONNECTED);
	}
	chatBoxMessage(){
		var message = Array.prototype.slice.call(arguments).join(' ');
		
		var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
		
		CHAT_BOX_MESSAGE.msg = message;
		CHAT_BOX_MESSAGE.messageSize = message.length;

		CHAT_BOX_MESSAGE.netId = this.parent.netId;
		this.parent.packetController.sendTo_self(CHAT_BOX_MESSAGE);
		console.debug(CHAT_BOX_MESSAGE);
	}
	SET_COOLDOWN(slot, cooldown = 0){//return;
		var SET_COOLDOWN = createPacket('SET_COOLDOWN', 'S2C');
		SET_COOLDOWN.netId = this.parent.netId;
		SET_COOLDOWN.Slot = slot;
		SET_COOLDOWN.bitfield = {
			PlayVOWhenCooldownReady: false,
			IsSummonerSpell: false,
		};
		SET_COOLDOWN.Cooldown = cooldown;
		SET_COOLDOWN.MaxCooldownForDisplay = cooldown;
		this.parent.packetController.sendTo_self(SET_COOLDOWN);
		console.log(SET_COOLDOWN);
	}
	// 497252 = root
	AddParticleTarget(PackageHash, EffectNameHash, BoneNameHash = 497252, target = undefined){
		var SPAWN_PARTICLE = createPacket('SPAWN_PARTICLE', 'S2C');
		SPAWN_PARTICLE.netId = 0;//this.netId;
		SPAWN_PARTICLE.FXCreateGroupData = [];
		SPAWN_PARTICLE.FXCreateGroupData[0] = {
			PackageHash: PackageHash,
			EffectNameHash: EffectNameHash,
			Flags: 32,
			TargetBoneNameHash: 0,
			BoneNameHash: BoneNameHash,
		};
		SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData = [];
		SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0] = {
			TargetNetId: target?.netId || 0,//this.netId,
			NetAssignedNetId: ++global.lastNetId,//?
			CasterNetId: 0,//this.netId,
			BindNetId: this.parent.netId,
			KeywordNetId: 0,//this.netId,
			TimeSpent: 0,
			ScriptScale: 1,
		};

		var ownerPositionCC = TranslateCenteredCoordinates.to([this.parent.Movement.position])[0];
		var targetPositionCC = target ? TranslateCenteredCoordinates.to([target.position])[0] : ownerPositionCC;
		targetPositionCC.z = 0;// don't know if it's necessary to set z
		ownerPositionCC.z = 50;

		SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].Position = ownerPositionCC;
		SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].OwnerPosition = ownerPositionCC;
		SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].TargetPosition = targetPositionCC;

		SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].OrientationVector = {
			x: 0,
			y: 0,
			z: 0,
		};

		SPAWN_PARTICLE.FXCreateGroupData[0].count = SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData.length;
		SPAWN_PARTICLE.count = SPAWN_PARTICLE.FXCreateGroupData.length;
		
		this.parent.packetController.sendTo_vision(SPAWN_PARTICLE);
		console.log(SPAWN_PARTICLE);
		console.log(SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData);
	}
}


module.exports = PacketConstructorsPlayer;
