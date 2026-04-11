
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import AhriTumble from './AhriTumble';


export default class AhriSoulCrusher extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.r;
	canMoveWhenCast = true;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0,
		designerTotalTime: 0,
	};

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const { packet } = castData;
		if (!packet)
			return;

		const { position } = packet;
		if (!position)
			return;

		const destPos = new Vector2(position.x, position.y);
		owner.moving.dashTo(destPos, { speed: 2200, range: 450 });
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new AhriTumble();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();
	}

}
