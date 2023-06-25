
const slotId = require('../../../../constants/slotId');
const _Turret_Fountain = require('../_Turret_Fountain');


module.exports = class OrderTurretShrine extends _Turret_Fountain {

	static spells = {
		OrderTurretShrineBasicAttack: require("./spells/OrderTurretShrineBasicAttack"),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretShrineBasicAttack,
		});
	}
};
