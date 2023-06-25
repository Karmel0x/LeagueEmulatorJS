
const _Basicattack = require("../../../../datamethods/spells/_Basicattack_");


/**
 * @abstract
 */
module.exports = class _Turret_NexusBasicAttack extends _Basicattack {

	//castRange = 1200;
	windupPercent = 22;
	isProjectile = true;
	missileSpeed = 1200;

	castInfo = {
		spellHash: this.spellHash,
		bitfield: {
			isAutoAttack: true,
			isClickCasted: true,
		},
		ammoUsed: 0,
		designerCastTime: 0.06,
		designerTotalTime: 0.06,
	};
	constructor(options) {
		super(options);

		this.castInfo._netId = this.owner.netId;
	}

};
