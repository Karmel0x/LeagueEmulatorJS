const _Minion_Wizard = require("../_Minion_Wizard");


module.exports = class Blue_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack: require('./Spells/Blue_Minion_WizardBasicAttack'),
		BasicAttack2: require('./Spells/Blue_Minion_WizardBasicAttack2'),
		CritAttack: require('./Spells/Blue_Minion_WizardCritAttack'),
	};

};
