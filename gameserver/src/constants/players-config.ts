import type { PlayerConfig } from '../gameobjects/units/player';
import { TeamId } from '../gameobjects/extensions/traits/team';

export default [
	{
		summoner: {
			id: 1,
			name: 'Player1',
			level: 30,
			spells: {
				d: '',
				f: '',
			},
			iconId: 666,
			rankId: 0,
			ribbonId: 0,
		},
		match: {
			team: TeamId.order,
			champion: 'Annie',
			skin: 0,
		},
		runes: [],
		masteries: [],
	},
	{
		summoner: {
			id: 2,
			name: 'Player2',
			level: 30,
			spells: {
				d: '',
				f: '',
			},
			iconId: 666,
			rankId: 0,
			ribbonId: 0,
		},
		match: {
			team: TeamId.chaos,
			champion: 'Annie',
			skin: 0,
		},
		runes: [],
		masteries: [],
	},
] as PlayerConfig[];
