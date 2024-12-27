
import _Basicattack from '@repo/gameserver/src/game/basedata/basicattack';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


/**
 * @abstract
 */
export default class _Turret_InnerBasicAttack extends _Basicattack {

	//castRange = 1200;
	windupPercent = 22;
	isMissile = true;
	missileSpeed = 1200;

	castInfo: Partial<SCastInfoModel> = {
		spellHash: this.spellHash,
		isAutoAttack: true,
		isClickCasted: true,
		ammoUsed: 0,
		designerCastTime: 0.06,
		designerTotalTime: 0.06,
	};

}
