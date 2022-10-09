
const slotId = require('../../../../Constants/slotId');
const _Turret_Fountain = require('../_Turret_Fountain');


module.exports = class ChaosTurretShrine extends _Turret_Fountain {

	static spells = {
		ChaosTurretShrineBasicAttack: require("./Spells/ChaosTurretShrineBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretShrineBasicAttack,
		});
	}
};
