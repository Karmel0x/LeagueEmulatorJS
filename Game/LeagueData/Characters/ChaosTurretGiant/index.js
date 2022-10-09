
const slotId = require('../../../../Constants/slotId');
const _Turret_Inhibitor = require('../_Turret_Inhibitor');


module.exports = class ChaosTurretGiant extends _Turret_Inhibitor {

	static spells = {
		ChaosTurretGiantBasicAttack: require("./Spells/ChaosTurretGiantBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretGiantBasicAttack,
		});
	}
};
