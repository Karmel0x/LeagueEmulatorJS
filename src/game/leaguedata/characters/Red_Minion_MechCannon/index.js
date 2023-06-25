const _Minion_MechCannon = require("../_Minion_MechCannon");


module.exports = class Red_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack: require('./spells/Red_Minion_MechCannonBasicAttack'),
		BasicAttack2: require('./spells/Red_Minion_MechCannonBasicAttack2'),
		CritAttack: require('./spells/Red_Minion_MechCannonCritAttack'),
	};

};
