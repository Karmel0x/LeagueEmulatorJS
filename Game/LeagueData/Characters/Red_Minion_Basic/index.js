const _Minion_Basic = require("../_Minion_Basic");


module.exports = class Red_Minion_Basic extends _Minion_Basic {

	static spells = {
		BasicAttack: require('./Spells/Red_Minion_BasicBasicAttack'),
		BasicAttack2: require('./Spells/Red_Minion_BasicBasicAttack2'),
		CritAttack: require('./Spells/Red_Minion_BasicCritAttack'),
	};

};
