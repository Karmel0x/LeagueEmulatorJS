
const slotId = require('../../../../Constants/slotId');
const _Turret_Outer = require("../_Turret_Outer");


module.exports = class OrderTurretNormal extends _Turret_Outer {

	static spells = {
		OrderTurretNormalBasicAttack: require("./Spells/OrderTurretNormalBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretNormalBasicAttack,
		});
	}
};
