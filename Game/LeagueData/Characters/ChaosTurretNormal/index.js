
const slotId = require('../../../../Constants/slotId');
const _Turret_Nexus = require('../_Turret_Nexus');


module.exports = class ChaosTurretNormal extends _Turret_Nexus {

	static spells = {
		ChaosTurretNormalBasicAttack: require("./Spells/ChaosTurretNormalBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretNormalBasicAttack,
		});
	}
};
