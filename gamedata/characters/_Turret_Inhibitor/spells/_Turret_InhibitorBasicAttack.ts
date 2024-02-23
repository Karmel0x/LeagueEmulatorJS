
import _Basicattack from '@workspace/gameserver/src/game/datamethods/spells/_Basicattack';
import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';


/**
 * @abstract
 */
export default class _Turret_InhibitorBasicAttack extends _Basicattack {

	//castRange = 1200;
	windupPercent = 22;
	isProjectile = true;
	missileSpeed = 1200;

	castInfo: Partial<SCastInfoModel> = {
		spellHash: this.spellHash,
		isAutoAttack: true,
		isClickCasted: true,
		ammoUsed: 0,
		designerCastTime: 0.06,
		designerTotalTime: 0.06,
	};
	constructor(options) {
		super(options);

		this.castInfo._netId = this.owner.netId;
	}

}
