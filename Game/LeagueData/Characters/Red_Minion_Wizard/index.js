const _Minion_Wizard = require("../_Minion_Wizard");


module.exports = class Red_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack: require('./Spells/Red_Minion_WizardBasicAttack'),
		BasicAttack2: require('./Spells/Red_Minion_WizardBasicAttack2'),
		CritAttack: require('./Spells/Red_Minion_WizardCritAttack'),
	};

};
