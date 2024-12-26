
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import EzrealArcaneShiftMissile from './EzrealArcaneShiftMissile';

import package1 from '../package';
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { Vector2 } from 'three';


export default class EzrealArcaneShift extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.E;
	canMoveWhenCast = true;

	static childSpellList = [
		EzrealArcaneShiftMissile,
	];

	onCast(spellData: SpellData) {
		if (!spellData.packet)
			return;

		super.onCast(spellData);

		const destPos = new Vector2(spellData.packet.position.x, spellData.packet.position.y);
		this.owner.moving.dashTo(destPos, { speed: 1800, range: 400 });
	}
}
