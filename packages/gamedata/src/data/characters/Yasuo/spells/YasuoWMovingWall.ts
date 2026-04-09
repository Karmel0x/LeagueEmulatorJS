
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import type { CastVars } from '@repo/scripting/load/spell-cast';


export default class YasuoW extends _Spell {

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

	}

}
