
import packets from '../../packets/index.js';
import slotId from '../../constants/slotId.js';
import loadingStages from '../../constants/loadingStages.js';
import Summoners from '../../game/leaguedata/Summoners/index.js';
import EVENT from '../../packets/EVENT.js';
import Server from '../../app/Server.js';

import Unit from './Unit.js';
import PPlayer from '../extensions/packets/Player.js';
import Spellable from '../extensions/combat/Spellable.js';
import Inventory from '../extensions/traits/Inventory.js';
import Network from '../extensions/traits/Network.js';
import Scoreboard from '../extensions/traits/Scoreboard.js';
import MovingUnit from '../extensions/traits/MovingUnit.js';


class Player extends Unit {

	static clientIds = -1;

	packets;
	combat;
	inventory;
	moving;
	network;
	scoreboard;

	summoner;
	clientId = -1;

	/**
	 * @param {import('../GameObjects.js').PlayerOptions} options 
	 */
	async loader(options) {
		await super.loader(options);

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
	 * @param {import('../GameObjects.js').PlayerOptions} options 
	 */
	constructor(options) {
		super(options);
	}

	/**
	 * It sends a packet to everyone in the game that the player has died
	 * @param {Unit} source - The source of the damage.
	 */
	announceDie(source) {
		const packet1 = new packets.OnEvent();
		packet1.netId = this.netId;
		packet1.eventId = EVENT.OnChampionDie;
		packet1.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(packet1);
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


export default Player;
