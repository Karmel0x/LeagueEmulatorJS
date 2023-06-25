const _Minion_MechMelee = require("../_Minion_MechMelee");


module.exports = class Red_Minion_MechMelee extends _Minion_MechMelee {

	static spells = {
		BasicAttack: require('./spells/Red_Minion_MechMeleeBasicAttack'),
		BasicAttack2: require('./spells/Red_Minion_MechMeleeBasicAttack2'),
		CritAttack: require('./spells/Red_Minion_MechMeleeCritAttack'),
	};

};
