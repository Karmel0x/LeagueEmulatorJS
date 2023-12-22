
import packets from '../../packets/index';
import slotId from '../../constants/slotId';
import loadingStages from '../../constants/loadingStages';
import Summoners from '../../game/leaguedata/Summoners/index';
import EVENT from '../../packets/EVENT';
import Server from '../../app/Server';

import Unit from './Unit';
import PPlayer from '../extensions/packets/Player';
import Spellable from '../extensions/combat/Spellable';
import Inventory from '../extensions/traits/Inventory';
import Network from '../extensions/traits/Network';
import Scoreboard from '../extensions/traits/Scoreboard';
import MovingUnit from '../extensions/traits/MovingUnit';
import { PlayerOptions, SummonerConfig } from '../GameObjects';


export default class Player extends Unit {
	static initialize(options: PlayerOptions) {
		return super.initialize(options) as Player;
	}

	static clientIds = -1;

	summoner!: SummonerConfig;
	clientId = -1;

	declare packets: PPlayer;
	combat!: Spellable;
	inventory!: Inventory;
	moving!: MovingUnit;
	network!: Network;
	scoreboard!: Scoreboard;

	summonerSpells!: Summoners;

	loader(options: PlayerOptions) {
		super.loader(options);

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

	constructor(options: PlayerOptions) {
		super(options);
	}

	/**
	 * It sends a packet to everyone in the game that the player has died
	 */
	announceDie(source: Unit) {
		const packet1 = new packets.OnEvent();
		packet1.netId = this.netId;
		packet1.eventId = EVENT.OnChampionDie;
		packet1.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(packet1);
	}

	async onDie(source: Unit) {
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
			gold -= gold * (0.085 + (!!i as unknown as number) * 0.115);

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
