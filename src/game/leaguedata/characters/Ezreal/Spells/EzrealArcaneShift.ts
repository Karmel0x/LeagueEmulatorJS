
import _Spell from '../../../../datamethods/spells/_Spell';
import EzrealArcaneShiftMissile from './EzrealArcaneShiftMissile';

import package1 from '../package';
import slotId from '../../../../../constants/slotId';


export default class EzrealArcaneShift extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.E;
	movingSpell = true;

	static childSpellList = [
		EzrealArcaneShiftMissile,
	];

	preCast(spellData) {

		spellData.position = spellData.packet.position;
		return super.preCast(spellData);
	}
	onCast(spellData) {
		super.onCast(spellData);

		this.owner.moving.dashTo(spellData.packet.position, { speed: 1800, range: 400 });

	}
}
