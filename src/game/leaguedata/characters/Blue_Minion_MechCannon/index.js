const _Minion_MechCannon = require("../_Minion_MechCannon");


module.exports = class Blue_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack: require('./spells/Blue_Minion_MechCannonBasicAttack'),
		BasicAttack2: require('./spells/Blue_Minion_MechCannonBasicAttack2'),
		CritAttack: require('./spells/Blue_Minion_MechCannonCritAttack'),
	};

};
