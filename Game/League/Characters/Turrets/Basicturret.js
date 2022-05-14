const _Turret = require("./_Turret");

const SpellsTurret = require('../../Spells/Turret');


module.exports = class Basicturret extends _Turret {
	//PackageHash = 3275499062;
	constructor(parent){
		super(parent);

		this.spells = new SpellsTurret(this);
		//this.spells = {
		//	0: new spellList.YasuoQ(this),
		//	1: new spellList.YasuoW(this),
		//	2: new spellList.YasuoE(this),
		//	3: new spellList.YasuoR(this),
		//	//62: new Passive(this),
		//	//64-81: Attack?
		//};
	}
};
