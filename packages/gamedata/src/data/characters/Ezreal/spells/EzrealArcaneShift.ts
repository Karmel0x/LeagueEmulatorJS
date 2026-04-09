
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { BuffAddType } from '@repo/gameserver/src/gameobjectextensions/traits/buff-manager';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import EzrealArcaneShiftMissile from './EzrealArcaneShiftMissile';
import EzrealRisingSpellForce from './EzrealRisingSpellForce';


export default class EzrealArcaneShift extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.e;
	canMoveWhenCast = true;

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const { packet } = castData;
		if (!packet)
			return;

		const { position } = packet;
		if (!position)
			return;

		const destPos = new Vector2(position.x, position.y);
		owner.moving.dashTo(destPos, { speed: 1800, range: 400 });
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new EzrealArcaneShiftMissile();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();

		const spell2 = new EzrealRisingSpellForce();
		owner.buffManager.addBuff(spell2, owner, {
			addType: BuffAddType.stacksAndRenews,
			buffType: BuffType.combatEnchancer,
			maxStack: 5,
			numberOfStacks: 1,
			duration: 5,
		});
	}

}
