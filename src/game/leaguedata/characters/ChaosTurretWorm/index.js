
const slotId = require('../../../../constants/slotId');
const _Turret_Outer = require("../_Turret_Outer");


module.exports = class ChaosTurretWorm extends _Turret_Outer {

	static spells = {
		ChaosTurretWormBasicAttack: require("./spells/ChaosTurretWormBasicAttack"),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretWormBasicAttack,
		});
	}
};
