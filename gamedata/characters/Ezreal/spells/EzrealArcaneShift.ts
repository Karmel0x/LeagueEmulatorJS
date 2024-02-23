
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import EzrealArcaneShiftMissile from './EzrealArcaneShiftMissile';

import package1 from '../package';
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';


export default class EzrealArcaneShift extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.E;
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
