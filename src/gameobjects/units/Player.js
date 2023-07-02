
const slotId = require('../../constants/slotId');
const loadingStages = require('../../constants/loadingStages');
const Summoners = require("../../game/leaguedata/Summoners");
const EVENT = require("../../packets/EVENT");
const Server = require('../../app/Server');

const Unit = require('./Unit');
const PPlayer = require("../extensions/packets/Player");
const Spellable = require('../extensions/combat/Spellable');
const Inventory = require('../extensions/traits/Inventory');
const Moving = require('../extensions/traits/Moving');
const Network = require('../extensions/traits/Network');
const Scoreboard = require('../extensions/traits/Scoreboard');
const MovingUnit = require('../extensions/traits/MovingUnit');


class Player extends Unit {

	static clientIds = -1;

	/** @type {PPlayer} */
	packets;
	combat;
	inventory;
	moving;
	network;
	scoreboard;

	summoner;
	clientId = -1;

	/**
	 * 
	 * @param {import('../GameObjects').PlayerOptions} options 
	 */
	constructor(options) {
		super(options);
		this.options = options;
		this.summoner = options.summoner;
		this.clientId = ++Player.clientIds;

		this.packets = new PPlayer(this);
		this.combat = new Spellable(this);
		this.inventory = new Inventory(this);
		this.moving = new MovingUnit(this);
		this.network = new Network(this);
		this.scoreboard = new Scoreboard(this);

		this.summonerSpells = new Summoners(this, ['SummonerHeal', 'SummonerFlash']);

		Server.players.push(this);
		this.initialized();
	}

	/**
	 * It sends a packet to everyone in the game that the player has died
	 * @param {Unit} source - The source of the damage.
	 */
	announceDie(source) {
		const OnEvent = Server.network.createPacket('OnEvent');
		OnEvent.netId = this.netId;
		OnEvent.eventId = EVENT.OnChampionDie;
		OnEvent.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(OnEvent);
	}

	/**
	 * 
	 * @param {Unit} source 
	 */
	async onDie(source) {
		this.announceDie(source);

		if (!this.died)
			return console.log('[weird] died but not died?');

		this.emit('die', source);
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
			for (let i = this.killDeathCounter; i > 1; --i)
				gold += gold * 0.165;

			return gold;
		}

		for (let i = this.killDeathCounter; i < -1; ++i)
			gold -= gold * (0.085 + /** @type {number} */ (/** @type {*} */ (!!i)) * 0.115);

		return gold < 50 ? 50 : gold;
	}

	get playerInfo() {
		return {
			playerId: this.summoner.id,
			summonorLevel: this.summoner.level,
			summonorSpell1: this.slots[slotId.D].spellHash,
			summonorSpell2: this.slots[slotId.F].spellHash,
			//bitfield: 0,
			team: this.team.id,
			//botName: "",
			//botSkinName: "",
			eloRanking: "DIAMOND",
			//botSkinId: 0,
			//botDifficulty: 0,
			//profileIconId: 0,
			//allyBadgeId: 2,
			//enemyBadgeId: 0
		};
	}

}


module.exports = Player;
