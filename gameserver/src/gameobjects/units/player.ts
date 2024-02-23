
import Hero from './hero';
export { HeroOptions as PlayerOptions } from './hero';


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

export type PlayerConfig = {
	summoner: SummonerConfig;
	match: {
		team: number;
		num?: number;
		champion: string;
		skin: number;
	};
	runes: [];
	masteries: [];
};


export default class Player extends Hero {

}
