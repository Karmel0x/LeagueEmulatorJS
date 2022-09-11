const _Minion_Basic = require("../_Minion_Basic");


module.exports = class Blue_Minion_Basic extends _Minion_Basic {

	static spells = {
		BasicAttack: require('./Spells/Blue_Minion_BasicBasicAttack'),
		BasicAttack2: require('./Spells/Blue_Minion_BasicBasicAttack2'),
		CritAttack: require('./Spells/Blue_Minion_BasicCritAttack'),
	};

};
