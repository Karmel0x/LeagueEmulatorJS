import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';
import { SpellData } from './spell';
import GameObjectList from '../../../app/game-object-list';

/**
 * Creates Spell Cast Info for _Spell.
 * After it has been created, spell shouldn't be cancelled
 */
export default class SpellCast {

	netId: number;
	spellData: SpellData;

	get spell() {
		return this.spellData.spell;
	}
	get owner() {
		return this.spell?.owner;
	}
	get missile() {
		return this.spellData.spellChain.missile;
	}

	_CastInfo: Partial<SCastInfoModel> = {};
	get castInfo() {
		const castInfo: Partial<SCastInfoModel> = {};
		castInfo.targetPosition = this.missile?.target?.position || this.spellData.packet?.position || this.owner?.position;
		castInfo.targetPositionEnd = this.missile?.target?.position || this.spellData.packet?.position || this.owner?.position;

		castInfo.spellHash = this.spell?.spellHash;
		castInfo.castNetId = this.netId;
		castInfo.spellLevel = this.spell?.spellLevel || 0;
		castInfo.attackSpeedModifier = 1;
		castInfo.casterNetId = this.owner?.netId || 0;
		castInfo.spellChainOwnerNetId = this.owner?.netId || 0;
		castInfo.packageHash = this.spell?.packageHash;
		castInfo.missileNetId = this.missile?.netId || 0;
		castInfo.targets = [{
			unit: (this.missile?.target?.netId ?? this.spellData.target?.netId ?? this.owner?.netId) || 0,
			hitResult: this.missile?.target?.netId ? 1 : 0,//todo
		}];

		castInfo.designerCastTime = -1;
		castInfo.extraCastTime = 0;
		castInfo.designerTotalTime = 0.70;
		castInfo.cooldown = this.spell?.cooldown || 0;
		castInfo.startCastTime = 0;

		castInfo.isAutoAttack = false;
		castInfo.isSecondAutoAttack = false;
		castInfo.isForceCastingOrChannel = false;
		castInfo.isOverrideCastPosition = false;
		castInfo.isClickCasted = false;

		castInfo.spellSlot = this.spell?.spellSlot;
		castInfo.manaCost = this.spell?.manaCost;
		castInfo.spellCastLaunchPosition = this.owner?.position;
		castInfo.ammoUsed = 1;
		castInfo.ammoRechargeTime = 0;

		Object.assign(castInfo, this.spell?.castInfo, this._CastInfo);
		return castInfo;
	}

	constructor(spellData: SpellData) {
		this.netId = ++GameObjectList.lastNetId;
		this.spellData = spellData;
	}
}
