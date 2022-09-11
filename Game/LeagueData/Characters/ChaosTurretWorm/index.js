
const slotId = require('../../../../Constants/slotId');
const _Turret_Outer = require("../_Turret_Outer");


module.exports = class ChaosTurretWorm extends _Turret_Outer {

	static spells = {
		ChaosTurretWormBasicAttack: require("./Spells/ChaosTurretWormBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretWormBasicAttack,
		});
	}
};
