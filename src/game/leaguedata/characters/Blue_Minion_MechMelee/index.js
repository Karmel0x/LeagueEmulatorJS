const _Minion_MechMelee = require("../_Minion_MechMelee");


module.exports = class Blue_Minion_MechMelee extends _Minion_MechMelee {

	static spells = {
		BasicAttack: require('./spells/Blue_Minion_MechMeleeBasicAttack'),
		BasicAttack2: require('./spells/Blue_Minion_MechMeleeBasicAttack2'),
		CritAttack: require('./spells/Blue_Minion_MechMeleeCritAttack'),
	};

};
