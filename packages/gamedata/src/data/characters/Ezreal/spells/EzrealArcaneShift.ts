
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import { SpellCast } from '@repo/gameserver/src/game/scripting/spell-cast';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import package1 from '../package';
import EzrealArcaneShiftMissile from './EzrealArcaneShiftMissile';


export default class EzrealArcaneShift extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.e;
	canMoveWhenCast = true;

	static childSpellList = [
		EzrealArcaneShiftMissile,
	];

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
	}

}
