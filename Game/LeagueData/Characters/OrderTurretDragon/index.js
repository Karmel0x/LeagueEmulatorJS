
const slotId = require('../../../../Constants/slotId');
const _Turret_Inhibitor = require('../_Turret_Inhibitor');


module.exports = class OrderTurretDragon extends _Turret_Inhibitor {

	static spells = {
		OrderTurretDragonBasicAttack: require("./Spells/OrderTurretDragonBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretDragonBasicAttack,
		});
	}
};
