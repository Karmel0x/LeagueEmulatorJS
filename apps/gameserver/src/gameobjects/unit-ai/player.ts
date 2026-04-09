
import type * as characters from '@repo/gamedata/data/characters/index';
import PlayerNetwork from '../../gameobjectextensions/traits/player-network';
import type { TeamId } from '../../gameobjectextensions/traits/team';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import Hero, { type HeroOptions } from './hero';
import { AiSubType } from './types';


export type PlayerOptions = HeroOptions & {
	runes: number[];
	talents: number[];
};

export type PlayerConfig = Omit<PlayerOptions, 'owner' | 'skin'> & {
	match: {
		team: TeamId;
		champion: string & keyof typeof characters;
		skin: number;
	};
};

export default class Player extends Hero {
	static initialize(options: PlayerOptions) {
		return super.initialize(options) as Player;
	}

	static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<PlayerOptions, 'owner'>) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	declare options: PlayerOptions;
	network!: PlayerNetwork;
	subType = AiSubType.Player;

	lastChatCommand = '';
	lastSelectedNetId = 0;

	constructor(options: PlayerOptions) {
		super(options);
	}

	loader(options: PlayerOptions) {
		this.network = new PlayerNetwork(this);

		super.loader(options);
	}

}
