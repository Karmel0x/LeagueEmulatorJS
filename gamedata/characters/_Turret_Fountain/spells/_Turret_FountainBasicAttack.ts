
import _Basicattack, { BasicAttackOptions } from '@workspace/gameserver/src/game/basedata/spells/basicattack';
import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';


/**
 * @abstract
 */
export default class _Turret_FountainBasicAttack extends _Basicattack {

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

	constructor(options: BasicAttackOptions) {
		super(options);

		this.castInfo.casterNetId = this.owner.netId;
	}

}
