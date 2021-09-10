var MoveableUnit = require('./MoveableUnit');
const {createPacket, sendPacket} = require("../../PacketUtilities");
const loadingStages = require('../../Constants/loadingStages');
const playersConfig = require('../../Constants/playersConfig');
const SummonerSpells = require("../../Characters/SummonerSpells");
const TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');


class Player extends MoveableUnit {
	KillDeathCounter = 0;
	loaded = false;

	constructor(team, num = 0, config = {}){
		var character = config.champion;
		
		//config.netId = 0x400005ed;
		config.info = config.info || {};
		config.info.spawnNum = 5;
		config.loadingStage = 0;

		super(team, num, character, config);

		const Champion_ = require('../../Characters/Champions/' + character);
		this.character = new Champion_(this);
		this.summonerSpells = new SummonerSpells(this, 'SummonerHeal', 'SummonerFlash');
		this.undoHistory = []

		this.initialized();
	}
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
			sendPacket(this.peer_num, packet);
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
		var isSent = this.sendPacket(SET_COOLDOWN);
		console.log(SET_COOLDOWN);
	}
	castSpellAns(CastInfo){

		var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
		CAST_SPELL_ANS.netId = this.netId;
		CAST_SPELL_ANS.CasterPositionSyncID = performance.now();
		CAST_SPELL_ANS.CastInfo = {
			SpellHash: 0,
			SpellNetID: 1073743439,
			SpellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetID: this.netId,
			SpellChainOwnerNetID: this.netId,
			PackageHash: this.character.PackageHash,
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

		CAST_SPELL_ANS.CastInfo.targetCount = CAST_SPELL_ANS.CastInfo.target.length;
		CAST_SPELL_ANS.CastInfo.size = 102 + CAST_SPELL_ANS.CastInfo.targetCount * 5;
		var isSent = this.sendPacket(CAST_SPELL_ANS);
		console.log(CAST_SPELL_ANS);
	}
	spawnProjectileAns(CastInfo, speed = 1200){//todo
		//return this.castSpellAns(CastInfo);
		var SPAWN_PROJECTILE = createPacket('SPAWN_PROJECTILE', 'S2C');
		SPAWN_PROJECTILE.CastInfo = {
			SpellHash: 0,
			SpellNetID: 1073743439,
			SpellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetID: this.netId,
			SpellChainOwnerNetID: this.netId,
			PackageHash: this.character.PackageHash,
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

		SPAWN_PROJECTILE.CastInfo.targetCount = SPAWN_PROJECTILE.CastInfo.target.length;
		SPAWN_PROJECTILE.CastInfo.size = 102 + SPAWN_PROJECTILE.CastInfo.targetCount * 5;
		var isSent = this.sendPacket(SPAWN_PROJECTILE);
		console.log(SPAWN_PROJECTILE);
	}
	//castSpell(packet){
	//    if(typeof this.character.spells[packet.Slot] == 'undefined')
	//        return console.log('wrong spell slot', packet.Slot);
	//
	//    this.character.spells[packet.Slot].cast(packet);
	//}

	// 497252 = root
	AddParticleTarget(EffectNameHash, BoneNameHash = 497252, target = undefined){
		var SPAWN_PARTICLE = createPacket('SPAWN_PARTICLE', 'S2C');
		SPAWN_PARTICLE.netId = 0;//this.netId;
		SPAWN_PARTICLE.FXCreateGroupData = [];
		SPAWN_PARTICLE.FXCreateGroupData[0] = {
			PackageHash: this.character.PackageHash,
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

		var ownerPositionCC = TranslateCenteredCoordinates.to([player.position])[0];
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
		var isSent = this.sendPacket(SPAWN_PARTICLE);
		console.log(SPAWN_PARTICLE);
		console.log(SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData);
	}
}


module.exports = Player;
