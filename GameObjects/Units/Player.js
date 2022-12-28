
const slotId = require('../../Constants/slotId');
const loadingStages = require('../../Constants/loadingStages');
const Summoners = require("../../Game/LeagueData/Summoners");

const { Vector2 } = require("three");

global.Players = global.Players || [];


const EVENT = require("../../Packets/EVENT");
const ExtendWTraits = require('../../Core/ExtendWTraits');
const Unit = require('./Unit');
const INetwork = require('../Traits/INetwork');
const IDefendable = require('../Traits/IDefendable');
const IAttackable = require('../Traits/IAttackable');
const IMovable = require('../Traits/IMovable');
const IInventory = require('../Traits/IInventory');
const IPPlayer = require("./PacketTraits/IPPlayer");
const IRespawnable = require("../Traits/IRespawnable");


const Players = {
	BLUE: {//ORDER
		0: { position: { x: 25.9, y: 280 }, rotation: 0 },
		1: { position: { x: 25.9, y: 280 }, rotation: 0 },
		2: { position: { x: 25.9, y: 280 }, rotation: 0 },
		3: { position: { x: 25.9, y: 280 }, rotation: 0 },
		4: { position: { x: 25.9, y: 280 }, rotation: 0 },
		5: { position: { x: 25.9, y: 280 }, rotation: 0 },
	},
	RED: {//CHAOS
		0: { position: { x: 13948, y: 14202 }, rotation: 0 },
		1: { position: { x: 13948, y: 14202 }, rotation: 0 },
		2: { position: { x: 13948, y: 14202 }, rotation: 0 },
		3: { position: { x: 13948, y: 14202 }, rotation: 0 },
		4: { position: { x: 13948, y: 14202 }, rotation: 0 },
		5: { position: { x: 13948, y: 14202 }, rotation: 0 },
	},
};

class Player extends ExtendWTraits(Unit, INetwork, IDefendable, IAttackable, IMovable, IInventory, IPPlayer, IRespawnable) {
	/**
	 * It sends a packet to everyone in the game that the player has died
	 * @param source - The source of the damage.
	 */
	announceDie(source) {
		var OnEvent = global.Network.createPacket('OnEvent');
		OnEvent.netId = this.netId;
		OnEvent.eventId = EVENT.OnChampionDie;
		OnEvent.eventData = {
			otherNetId: source.netId
		};
		this.sendTo_everyone(OnEvent);
	}

	async onDie(source) {
		this.announceDie(source);

		if (!this.died)
			return console.log('[weird] died but not died?');

		this.respawnWaiter();
	}

	/**
	 * Kill death counter to calculate bounties
	 */
	killDeathCounter = 0;

	/**
	 * gold amount to give to enemy player
	 */
	get rewardGold() {
		if (this.killDeathCounter >= 5)
			return 500;

		let gold = 300;
		if (this.killDeathCounter >= 0) {
			for (var i = this.killDeathCounter; i > 1; --i)
				gold += gold * 0.165;
			return gold;
		}
		for (var i = this.killDeathCounter; i < -1; ++i)
			gold -= gold * (0.085 + !!i * 0.115);

		return gold < 50 ? 50 : gold;
	}


	loadingStage = loadingStages.NOT_CONNECTED;

	constructor(options) {
		super(options);

		this.summonerSpells = new Summoners(this, ['SummonerHeal', 'SummonerFlash']);

		this.spawnPosition = Players[this.teamName][5].position;
		global.Players.push(this);
		this.initialized();
	}

	get playerInfo() {
		return Object.assign({}, this.info, {
			summonorSpell1: this.spellSlots[slotId.D].spellHash,
			summonorSpell2: this.spellSlots[slotId.F].spellHash,
			teamId: this.teamId,
		});
	}

	useSlot(packet) {
		this.emit('useSlot', packet.slot, packet);
		//if(packet.slot >= 0 && packet.slot <= 3)
		//	this.character.castSpell(packet);
		//else if(packet.slot >= 4 && packet.slot <= 5)
		//	this.summonerSpells.castSpell(packet);
		//else if(packet.slot >= 6 && packet.slot <= 12)
		//	this.inventory.castSpell(packet);
	}
	
	castSpell(packet) {
		this.useSlot(packet);
	}

	/**
	 * 
	 * @param {Object} spawnList 
	 * @param {Object} spawnList[team]
	 * @param {Object} spawnList[team][num]
	 * @param {String} spawnList[team][num].character
	 * @param {Vector2} [spawnList[team][num].position=Players[team][num].position] {x, y}
	 * @param {Object} spawnList[team][num].info - player details
	 */
	static spawnAll(spawnList) {
		for (let team in spawnList)
			for (let num in spawnList[team])
				new Player({
					team, num,
					character: spawnList[team][num].character,
					spawnPosition: spawnList[team][num].position || Players[team][num].position,
					info: spawnList[team][num].info,
				});
	}
}


module.exports = Player;
