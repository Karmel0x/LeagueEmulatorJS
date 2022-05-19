
const {createPacket, sendPacket, sendPacketS} = require("../../../Core/PacketUtilities");
const loadingStages = require('../../../Constants/loadingStages');
const SpellsSummoner = require("../../League/Spells/Summoner");
const TranslateCenteredCoordinates = require('../../../Functions/TranslateCenteredCoordinates');

var ConstantsUnit = require('../../../Constants/Unit');

const Unit = require('../Unit');
const Movement = require('../Unit/Controllers/Movement');
const CharactersChampions = require('../../League/Characters/Champions');
const TEAM = require('../../../Constants/TEAM');
const { Vector2 } = require("three");
const SpellSlot = require("../../../Constants/SpellSlot");

global.Players = global.Players || [];

class Player extends Unit {
	HERO_SPAWN(dest = global.Teams['ALL']){
		this.PacketConstructors.HERO_SPAWN(dest);
	}
	AVATAR_INFO(dest = global.Teams['ALL']){
		this.PacketConstructors.AVATAR_INFO(dest);
	}
	sendReconnectPackets(){
		global.Players.forEach(player => {
			player.HERO_SPAWN(this);
			player.AVATAR_INFO(this);
			
		});
	}

	/**
	 * 
	 * @param {String} team (RED/BLUE)
	 * @param {Number} num playerNumber (0-4)
	 * @param {Object} config 
	 * @returns 
	 */
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
			SummonorSpell1: this.summonerSpells.spells[SpellSlot.D].spellHash,
			SummonorSpell2: this.summonerSpells.spells[SpellSlot.F].spellHash,
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
	
	chatBoxMessage(){
		this.PacketConstructors.chatBoxMessage(...arguments);
	}
	SET_HEALTH(){
		this.stats.charStats_send();
	}
	SET_COOLDOWN(slot, cooldown = 0){//return;
		this.PacketConstructors.SET_COOLDOWN(slot, cooldown);
	}
	castSpell(packet){
		if(packet.Slot >= 0 && packet.Slot <= 3)
			this.character.castSpell(packet);
		else if(packet.Slot >= 4 && packet.Slot <= 5)
			this.summonerSpells.castSpell(packet);
		else if(packet.Slot >= 6 && packet.Slot <= 12)
			this.inventory.castSpell(packet);
	}

	// 497252 = root
	AddParticleTarget(PackageHash, EffectNameHash, BoneNameHash = 497252, target = undefined){
		this.PacketConstructors.AddParticleTarget(PackageHash, EffectNameHash, BoneNameHash, target);
	}
	respawn(){
		
		var pos = ConstantsUnit[this.info.type]?.team?.[this.info.team]?.spawn?.[this.info.spawnNum].position
			|| ConstantsUnit[this.info.type]?.team?.[this.info.team]?.respawn.position || {x: 0, y: 0};
		this.spawnPosition = new Vector2(pos.x, pos.y);

		console.log('respawn', this.spawnPosition, this.info.spawnNum);
		super.respawn();
	}
}


module.exports = Player;
