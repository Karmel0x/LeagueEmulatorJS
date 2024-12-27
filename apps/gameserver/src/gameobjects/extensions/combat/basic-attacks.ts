
import { Vector2 } from '@repo/geometry';
import { SlotId } from '../../../constants/slot-id';
import { sendBasicAttack, sendStopAttack } from '../../../packet-helpers/basic-attack';
import type AttackableUnit from '../../units/attackable-unit';


export default class BasicAttacks {
	readonly owner: AttackableUnit;

	constructor(owner: AttackableUnit) {
		this.owner = owner;

		this.owner.eventEmitter.on('preCastSpell', (spell, targets, e) => {
			if (!targets)
				return;

			const target = targets[0];
			if (!target)
				return;

			if (!spell)
				return;

			// TODO: use slot instead of name
			const spellName = spell.name.toLowerCase();
			if (!spellName.includes('basicattack') && !spellName.includes('critattack'))
				return;

			e.sendSpellCast = false;
			e.sendMissileReplication = false;

			// TODO
			const attackTotalTime = 1.6;

			const attackSpeedMod = 1 + this.owner.stats.attackSpeed.total - 0.625;
			const attackCastTime = attackTotalTime / attackSpeedMod;

			e.totalTime = attackTotalTime;
			e.castTime = attackCastTime;

			// TODO: extraTime [-0.14, 0]
			const extraTime = 0;
			this.attackAns(target, SlotId.a, extraTime);
			//(owner.ai as Player)?.packets?.chatBoxDebugMessage('aa extraTime', extraTime);
		});

		this.owner.eventEmitter.on('cancelSpellCast', (spell) => {
			if (!spell)
				return;

			const spellName = spell.name.toLowerCase();
			if (!spellName.includes('basicattack') && !spellName.includes('critattack'))
				return;

			sendStopAttack(this.owner, {});
		});
	}

	lastAttackPos = new Vector2();

	attackAns(target: AttackableUnit, attackSlot: number, extraTimeS: number = 0) {
		sendBasicAttack(this.owner, target, {
			attackSlot,
			extraTimeS,
		}, this.lastAttackPos);
	}

}
