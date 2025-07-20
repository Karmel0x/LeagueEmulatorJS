
import PlayerNetwork from '../../gameobjectextensions/traits/player-network';
import type { TeamId } from '../../gameobjectextensions/traits/team';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import Hero, { type HeroOptions } from './hero';
import { AiSubType } from './types';


export type PlayerConfig = HeroOptions & {
	match: {
		team: TeamId;
		champion: string;
		skin: number;
	};
	runes: [];
	masteries: [];
};

export type PlayerOptions = HeroOptions;

export default class Player extends Hero {
	static initialize(options: PlayerOptions) {
		return super.initialize(options) as Player;
	}

	static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<PlayerConfig, 'owner'>) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	declare options: PlayerConfig;
	network!: PlayerNetwork;
	subType = AiSubType.Player;

	lastChatCommand = '';
	lastSelectedNetId = 0;

	loader(options: PlayerOptions) {
		this.network = new PlayerNetwork(this);

		super.loader(options);
	}

}
