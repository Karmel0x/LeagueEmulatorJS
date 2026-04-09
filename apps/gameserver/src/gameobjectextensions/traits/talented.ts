
import type Talent from '@repo/scripting/base/talent';
import { getTalent } from '@repo/scripting/load/talent';
import type { Hero, Player } from '../../gameobjects/unit-ai';
import { AiSubType, AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';


const TalentSlot = 0;

type TalentOnSlot = {
	talent: Talent,
	level: number,
};

/**
 * Trait for units that are talented (has masteries)
 */
export default class Talented {
	readonly owner;

	constructor(owner: AttackableUnit) {
		this.owner = owner;

		owner.eventEmitter.on('spawn', () => {
			const ai = owner.ai as Hero;
			if (ai.type !== AiType.Hero)
				return;

			const ai2 = owner.ai as Player;
			if (ai2.subType !== AiSubType.Player)
				return;

			const talents = ai2.options.talents;
			//if (talents.length > 30) {
			//	console.error('incorrect talents quantity');
			//	return;
			//}

			const talentsG = Object.groupBy(talents, v => v);
			const talentsE = Object.entries(talentsG);

			talentsE.forEach(([talentId, talents], i) => {
				const level = talents!.length;
				const talent = getTalent(`${talentId}`);
				if (talent) {
					this.putTalentOnSlot(TalentSlot + i, talent, level);
				}
			});
		});
	}

	talents: (TalentOnSlot | undefined)[] = [];

	putTalentOnSlot(slot: number, talent: Talent, level = 1) {
		const talentOnSlot = this.talents[slot];
		if (talentOnSlot) {
			talentOnSlot.level += level;
		}
		else {
			this.talents[slot] = {
				talent,
				level,
			};

			const owner = this.owner;
			talent.eventEmitter.emit('activate', owner);
		}
	}

}
