const _Minion_MechCannon = require("../_Minion_MechCannon");


module.exports = class Red_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack: require('./Spells/Red_Minion_MechCannonBasicAttack'),
		BasicAttack2: require('./Spells/Red_Minion_MechCannonBasicAttack2'),
		CritAttack: require('./Spells/Red_Minion_MechCannonCritAttack'),
	};

};
