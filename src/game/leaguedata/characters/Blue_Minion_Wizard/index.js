const _Minion_Wizard = require("../_Minion_Wizard");


module.exports = class Blue_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack: require('./spells/Blue_Minion_WizardBasicAttack'),
		BasicAttack2: require('./spells/Blue_Minion_WizardBasicAttack2'),
		CritAttack: require('./spells/Blue_Minion_WizardCritAttack'),
	};

};
