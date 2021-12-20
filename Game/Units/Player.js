
const {createPacket, sendPacket, sendPacketS} = require("../../Core/PacketUtilities");
const loadingStages = require('../../Constants/loadingStages');
const SpellsSummoner = require("../Spells/Summoner");
const TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');

const Unit = require('./Unit');
const Movement = require('./Controllers/Movement');
const CharactersChampions = require('../Characters/Champions');
const TEAM = require('../../Constants/TEAM');
const CreateHeroDeath = {
	Alive: 0,
	Zombie: 1,
	Dead: 2
};

global.Players = global.Players || [];

class Player extends Unit {
	HERO_SPAWN(dest = global.Teams['ALL']){
		//todo
		
		var HERO_SPAWN = createPacket('HERO_SPAWN');
		//HERO_SPAWN.netId = this.netId;
		HERO_SPAWN.NetID = this.netId;
		HERO_SPAWN.ClientID = this._PlayerInfo.ClientID;
		HERO_SPAWN.NetNodeID = 0;//0x40;
		HERO_SPAWN.SkinID = 0;
		HERO_SPAWN.Name = 'Test';//playerName
		HERO_SPAWN.Skin = this.character.name;//modelName

		HERO_SPAWN.bitfield = {
			TeamIsOrder: this.info.team == 'BLUE',
			IsBot: false
		};
		HERO_SPAWN.CreateHeroDeath = CreateHeroDeath.Alive;
		HERO_SPAWN.SpawnPositionIndex = 0;//2;

		dest.sendPacket(HERO_SPAWN, loadingStages.NOT_CONNECTED);
	}
	AVATAR_INFO(dest = global.Teams['ALL']){
		//todo
		var AVATAR_INFO = createPacket('AVATAR_INFO');
		AVATAR_INFO.netId = this.netId;
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
	sendReconnectPackets(){
		global.Players.forEach(player => {
			player.HERO_SPAWN(this);
			player.AVATAR_INFO(this);
			
		});
	}

	static create(team, num, config = {}){
		var unit = new Player(team, num, config.characterName, config);
		unit.character = CharactersChampions.create(unit, config.characterName);
		unit.initialized();
		global.Players.push(unit);
		return unit;
	}

	KillDeathCounter = 0;
	loaded = false;

	constructor(team, num = 0, characterName = '', config = {}){
		
		//config.netId = 0x400005ed;
		config.info = config.info || {};
		config.info.spawnNum = 5;
		config.loadingStage = 0;

		super(team, num, characterName, config);

		//this.character = character;
		this.summonerSpells = new SpellsSummoner(this, 'SummonerHeal', 'SummonerFlash');
		this.Movement = new Movement(this);
		
	}
	get PlayerInfo(){
		return Object.assign({}, this._PlayerInfo, {
			SummonorSpell1: this.summonerSpells.spells[0].spellHash,
			SummonorSpell2: this.summonerSpells.spells[1].spellHash,
			TeamId: TEAM[this.info.team] || 0,
		});
	}
	//_storePacket = [];
	//storePacket(packet){
	//	this._storePacket.push(packet);
	//}
	//restorePackets(){
	//	console.log('restorePackets', this._storePacket);
	//	while(this._storePacket.length){
	//		var packet = this._storePacket.shift();
	//		sendPacketS([this.peer_num], packet.channel, packet.buffer);
	//	}
	//}
	//todo: packet batching
	//packetBatching = false;
	//batchedPackets = [];
	//batch_begin(){
	//    this.packetBatching = true;
	//}
	//batch_end(){
	//    this.packetBatching = false;
	//    var packet = {};
	//    packet.packets = this.batchedPackets;
	//    this.batchedPackets = [];
	//    //todo: create batchet packet
	//    sendPacket(this.peer_num, packet);
	//}
	sendPacket(packet, minStage = loadingStages.IN_GAME){
		if(this.loadingStage < minStage)
			return;
		
		//if(this.packetBatching)
		//    this.batchPackets.push(packet);
		//else
			sendPacket([this.peer_num], packet);
	}
	
	chatBoxMessage(message){
		
		var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
		
		CHAT_BOX_MESSAGE.msg = message;
		CHAT_BOX_MESSAGE.messageSize = message.length;

		CHAT_BOX_MESSAGE.netId = this.netId;
		this.packetController.sendTo_self(CHAT_BOX_MESSAGE);
		console.debug(CHAT_BOX_MESSAGE);
	}
	SET_HEALTH(){
		this.stats.charStats_send();
	}
	SET_COOLDOWN(slot, cooldown = 0){//return;
		var SET_COOLDOWN = createPacket('SET_COOLDOWN', 'S2C');
		SET_COOLDOWN.netId = this.netId;
		SET_COOLDOWN.Slot = slot;
		SET_COOLDOWN.bitfield = {
			PlayVOWhenCooldownReady: false,
			IsSummonerSpell: false,
		};
		SET_COOLDOWN.Cooldown = cooldown;
		SET_COOLDOWN.MaxCooldownForDisplay = cooldown;
		this.packetController.sendTo_self(SET_COOLDOWN);
		console.log(SET_COOLDOWN);
	}
	castSpell(packet){
		if(packet.Slot >= 0 && packet.Slot <= 3)
			this.character.castSpell(packet);
		else if(packet.Slot >= 4 && packet.Slot <= 5)
			this.summonerSpells.castSpell(packet);
		else if(packet.Slot >= 6 && packet.Slot <= 12)
			this.inventory.castSpell(packet);
	}
	castSpellAns(CastInfo, PackageHash){

		var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
		CAST_SPELL_ANS.netId = this.netId;
		CAST_SPELL_ANS.CasterPositionSyncID = this.PositionSyncID;
		CAST_SPELL_ANS.CastInfo = {
			SpellHash: 0,
			SpellNetID: 1073743439,
			SpellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetID: this.netId,
			SpellChainOwnerNetID: this.netId,
			PackageHash: PackageHash,
			MissileNetID: 1073743440,
			TargetPosition: {},
			TargetPositionEnd: {},
			DesignerCastTime: 0.25,
			DesignerTotalTime: 0.25,
			ManaCost: 28,
			SpellCastLaunchPosition: {
				x: this.position.x,
				y: this.position.y,
				z: 0,
			},
			AmmoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(CAST_SPELL_ANS.CastInfo, CastInfo);

		this.packetController.sendTo_vision(CAST_SPELL_ANS);
		console.log(CAST_SPELL_ANS);
	}
	spawnProjectileAns(CastInfo, PackageHash, speed = 1200){//todo
		//return this.castSpellAns(CastInfo);
		var SPAWN_PROJECTILE = createPacket('SPAWN_PROJECTILE', 'S2C');
		SPAWN_PROJECTILE.CastInfo = {
			SpellHash: 0,
			SpellNetID: 1073743439,
			SpellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetID: this.netId,
			SpellChainOwnerNetID: this.netId,
			PackageHash: PackageHash,
			MissileNetID: 1073743440,
			TargetPosition: {},
			TargetPositionEnd: {},
			DesignerCastTime: 0.25,
			DesignerTotalTime: 0.25,
			ManaCost: 28,
			SpellCastLaunchPosition: {
				x: this.position.x,
				y: this.position.y,
				z: 0,
			},
			AmmoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(SPAWN_PROJECTILE.CastInfo, CastInfo);
		SPAWN_PROJECTILE.netId = SPAWN_PROJECTILE.CastInfo.MissileNetID;// ??
		SPAWN_PROJECTILE.Position = SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.CasterPosition = SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		//SPAWN_PROJECTILE.Direction = {
		//    "x": 0.36772018671035767,
		//    "z": 0,
		//    "y": 0.9299365282058716
		//}
		//SPAWN_PROJECTILE.Velocity = {
		//    "x": 441.2642517089844,
		//    "z": -109.0909194946289,
		//    "y": 1115.9239501953125
		//};
		SPAWN_PROJECTILE.StartPoint = SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.EndPoint = SPAWN_PROJECTILE.CastInfo.TargetPosition;
		SPAWN_PROJECTILE.UnitPosition = SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.Speed = speed;

		this.packetController.sendTo_vision(SPAWN_PROJECTILE);
		console.log(SPAWN_PROJECTILE);
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
			TargetNetID: target?.netId || 0,//this.netId,
			NetAssignedNetID: ++global.lastNetId,//?
			CasterNetID: 0,//this.netId,
			BindNetID: this.netId,
			KeywordNetID: 0,//this.netId,
			TimeSpent: 0,
			ScriptScale: 1,
		};

		var ownerPositionCC = TranslateCenteredCoordinates.to([this.Movement.position])[0];
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
		
		this.packetController.sendTo_vision(SPAWN_PARTICLE);
		console.log(SPAWN_PARTICLE);
		console.log(SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData);
	}
}


module.exports = Player;
