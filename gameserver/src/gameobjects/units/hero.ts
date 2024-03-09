
import * as packets from '@workspace/packets/packages/packets';
import { SlotId } from '../../constants/slot-id';
import Summoners from '@workspace/gamedata/summoners/index';

import AttackableUnit, { AttackableUnitEvents, AttackableUnitOptions } from './attackable-unit';
import PHero from '../extensions/packets/hero';
import Network from '../extensions/traits/unit-network';
import Scoreboard from '../extensions/traits/scoreboard';
import { SPlayerInfoModel } from '@workspace/packets/packages/packets/base/s2c/0x54-SynchVersion';
import { OnEvent, OnEventArguments } from '@workspace/packets/packages/packets/types/on-event';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type Fountain from '../spawners/fountain';
import type { SummonerConfig } from './player';
import Progressable from '../extensions/progress/progressable';
import _Hero from '../../game/basedata/characters/hero';


export type HeroOptions = AttackableUnitOptions & {
	summoner: SummonerConfig;
	spawner: Fountain;
};

export type HeroEvents = AttackableUnitEvents & {
	'respawn': () => void;
}

export default class Hero extends AttackableUnit {
	static clientIds = -1;

	static initialize(options: HeroOptions) {
		return super.initialize(options) as Hero;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<HeroEvents>;

	declare spawner: Fountain;
	declare character: _Hero;
	summoner!: SummonerConfig;
	clientId = -1;

	declare packets: PHero;
	declare progress: Progressable;
	network!: Network;
	scoreboard!: Scoreboard;

	summonerSpells!: Summoners;

	loader(options: HeroOptions) {

		this.options = options;
		this.summoner = options.summoner;
		this.clientId = ++Hero.clientIds;

		this.packets = new PHero(this);

		super.loader(options);

		this.progress = new Progressable(this);
		this.network = new Network(this);
		this.scoreboard = new Scoreboard(this);

		this.summonerSpells = new Summoners(this, ['SummonerHeal', 'SummonerFlash']);

		this.initialized();
	}

	constructor(options: HeroOptions) {
		super(options);
	}

	/**
	 * It sends a packet to everyone in the game that the hero has died
	 */
	announceDie(source: AttackableUnit) {
		const packet1 = packets.OnEvent.create({
			netId: this.netId,
			eventData: {
				event: OnEvent.onChampionDie,
				onEventParam: OnEventArguments[OnEvent.onChampionDie],
				otherNetId: source.netId,
				goldGiven: 0,
				assists: [],
			},
		});
		this.packets.toEveryone(packet1);
	}

	async onDie(source: AttackableUnit) {
		this.announceDie(source);

		if (!this.combat.died)
			return console.log('[weird] died but not died?');

		this.eventEmitter.emit('die', source);
	}

	/**
	 * Kill death counter to calculate bounties
	 */
	killDeathCounter = 0;

	/**
	 * gold amount to give to enemy hero
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
		let playerInfo: Partial<SPlayerInfoModel> = {
			playerId: this.summoner.id,
			summonorLevel: this.summoner.level,
			summonorSpell1: this.slots[SlotId.D].spellHash,
			summonorSpell2: this.slots[SlotId.F].spellHash,
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
		return playerInfo;
	}

}
