
const slotId = require('../../../../Constants/slotId');
const _Turret_Inner = require('../_Turret_Inner');


module.exports = class OrderTurretNormal2 extends _Turret_Inner {

	static spells = {
		OrderTurretNormal2BasicAttack: require("./Spells/OrderTurretNormal2BasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretNormal2BasicAttack,
		});
	}
};
