
import Summoners from '@repo/gamedata/data/summoners/index';
import type { SPlayerInfoModel } from '@repo/packets/base/s2c/0x54-SynchVersion';
import * as packets from '@repo/packets/list';
import { OnEvent, OnEventArguments } from '@repo/packets/types/on-event';
import type Spell from '@repo/scripting/base/spell';
import { EventEmitter2 } from '../../core/event-emitter2';
import PHero from '../extensions/packets/hero';
import Scoreboard from '../extensions/traits/scoreboard';
import type AttackableUnit from '../units/attackable-unit';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import BaseAi, { type BaseAiEvents, type BaseAiOptions } from './base-ai';
import { AiSubType, AiType } from './types';

export type SummonerConfig = {
	id: number;
	name: string;
	level: number;
	spells: {
		d: string;
		f: string;
	};
	iconId: number;
	rankId: number;
	ribbonId: number;
};

export type HeroOptions = BaseAiOptions & {
	summoner: SummonerConfig;
	num: number;
};

export type HeroEvents = BaseAiEvents & {
	'respawn': () => void;
}

export default class Hero extends BaseAi {
	static clientIds = -1;

	static initialize(options: HeroOptions) {
		return super.initialize(options) as Hero;
	}

	static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<HeroOptions, 'owner'>) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<HeroEvents>();

	declare options: HeroOptions;
	num: number;
	type = AiType.Hero;
	subType = AiSubType.Bot;

	summoner!: SummonerConfig;
	clientId = -1;
	declare packets: PHero;
	scoreboard!: Scoreboard;

	summonerSpells!: Spell[];

	constructor(options: HeroOptions) {
		super(options);

		this.num = options.num;
	}

	loader(options: HeroOptions) {

		this.summoner = options.summoner;
		this.clientId = ++Hero.clientIds;
		this.packets = new PHero(this);
		this.scoreboard = new Scoreboard(this);

		this.summonerSpells = Summoners.getSummonerSpells([
			options.summoner.spells.d,
			options.summoner.spells.f,
		]);

		super.loader(options);
		this.pinEvents();
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));
	}

	/**
	 * It sends a packet to everyone in the game that the hero has died
	 */
	announceDie(source: AttackableUnit, assists: AttackableUnit[]) {
		const packet1 = packets.OnEvent.create({
			netId: this.owner.netId,
			eventData: {
				eventId: OnEvent.onChampionDie,
				onEventParam: OnEventArguments[OnEvent.onChampionDie],
				sourceNetId: source.netId,
				otherNetId: 0,
				goldGiven: 0,
				assists: assists.map(a => a.netId),
			},
		});
		this.owner.packets.toEveryone(packet1);
	}

	async onDie(attacker: AttackableUnit, assists: AttackableUnit[]) {
		this.announceDie(attacker, assists);
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
		const playerInfo: Partial<SPlayerInfoModel> = {
			playerId: this.summoner.id,
			summonorLevel: this.summoner.level,
			summonorSpell1: this.summonerSpells[0]?.spellHash,
			summonorSpell2: this.summonerSpells[1]?.spellHash,
			//bitfield: 0,
			team: this.owner.team.id,
			//botName: "",
			//botSkinName: "",
			//eloRanking: "DIAMOND",
			//botSkinId: 0,
			//botDifficulty: 0,
			profileIconId: 1,
			//allyBadgeId: 2,
			//enemyBadgeId: 0
		};
		return playerInfo;
	}

}
