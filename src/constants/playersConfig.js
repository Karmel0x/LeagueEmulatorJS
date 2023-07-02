const Team = require("../gameobjects/extensions/traits/Team");

/** @type {import("../gameobjects/GameObjects").PlayerConfig[]} */
module.exports = [
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
			team: Team.TEAM_BLUE,
			champion: 'Yasuo',
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
			team: Team.TEAM_RED,
			champion: 'Ezreal',
			skin: 0,
		},
		runes: [],
		masteries: [],
	},
];
