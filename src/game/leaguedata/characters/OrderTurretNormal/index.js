
const slotId = require('../../../../constants/slotId');
const _Turret_Outer = require("../_Turret_Outer");


module.exports = class OrderTurretNormal extends _Turret_Outer {

	static spells = {
		OrderTurretNormalBasicAttack: require("./spells/OrderTurretNormalBasicAttack"),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretNormalBasicAttack,
		});
	}
};
