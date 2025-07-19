
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { BuffAddType } from '@repo/gameserver/src/gameobjects/extensions/traits/buff-manager';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import EzrealArcaneShiftMissile from './EzrealArcaneShiftMissile';
import EzrealRisingSpellForce from './EzrealRisingSpellForce';


export default class EzrealArcaneShift extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.e;
	canMoveWhenCast = true;

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const { packet } = castData;
		if (!packet)
			return;

		const { position } = packet;
		if (!position)
			return;

		const destPos = new Vector2(position.x, position.y);
		owner.moving.dashTo(destPos, { speed: 1800, range: 400 });
	}

	async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const Spell = EzrealArcaneShiftMissile;
		const spell = new Spell();
		spell.name = Spell.name;
		const spellCast = new SpellCast(spell, owner, castData);
		await spellCast.castSpell(spellVars);

		const Spell2 = EzrealRisingSpellForce;
		const spell2 = new Spell2();
		spell2.name = Spell2.name;

		owner.buffManager.addBuff(spell2, owner, {
			addType: BuffAddType.stacksAndRenews,
			buffType: BuffType.combatEnchancer,
			maxStack: 5,
			numberOfStacks: 1,
			duration: 5,
		});
	}

}
