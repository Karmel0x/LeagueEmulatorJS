
import * as packets from '@workspace/packets/packages/packets';
import Server from '../../../app/server';
import { TeamId } from '../traits/team';
import { DamageResultType, DamageType } from '@workspace/packets/packages/packets/base/s2c/0x65-UnitApplyDamage';
import Unit, { UnitEvents } from '../../units/unit';
import TypedEventEmitter from 'typed-emitter';
import { IAttackable } from './attackable';
import Targetable from './targetable';


export type DefendableEvents = UnitEvents & {
	'die': (source: IAttackable) => void;
};

export interface IDefendable extends Unit {
	eventEmitter: TypedEventEmitter<DefendableEvents>;
	combat: Defendable;
	onDie(source: IAttackable): void;
}

/**
 * Trait for units that can be attacked
 */
export default class Defendable extends Targetable {
	declare owner: IDefendable;
	respawnable = false;

	constructor(owner: IDefendable, respawnable = false) {
		super(owner);
		this.respawnable = respawnable;

		this.owner.eventEmitter.on('die', (source) => {
			this.owner.onDie(source);

			if (!this.respawnable)
				this.owner.eventEmitter.emit('destroy');
		});
	}

	UnitApplyDamage(source: IAttackable, damage: { resultType?: number; type?: number; amount?: number; }) {
		const packet1 = packets.UnitApplyDamage.create({
			netId: this.owner.netId,
			damageResultType: damage.resultType || DamageResultType.normal,
			unknown1: 125,
			damageType: damage.type || DamageType.mixed,
			damage: damage.amount || 0,
			targetNetId: this.owner.netId,
			sourceNetId: source.netId,
		});
		this.owner.packets.toEveryone(packet1);
	}

	damageReductionFromArmor() {
		return 100 / (100 + this.owner.stats.armor.total);
	}

	damage(source: IAttackable, dmg: { ad: number; }) {
		//console.log('damage', dmg, this.health.current, this.health.total);
		dmg.ad = dmg.ad * this.damageReductionFromArmor();

		if (dmg.ad <= 0)
			return;

		// do not die while testing @todo remove it
		if (this.owner.type == 'Player')
			this.owner.stats.health.minimum = 1;

		this.owner.stats.health.current -= dmg.ad;

		if (this.owner.stats.health.current <= 0)
			this.die(source);

		this.UnitApplyDamage(source, {
			amount: dmg.ad,
		});

		this.owner.packets.OnEnterLocalVisibilityClient();
	}

	die(source: IAttackable) {
		this.owner.stats.health.current = 0;
		this.died = Date.now() / 1000;
		this.owner.onDie(source);
		Server.teams[TeamId.max].vision(this.owner, false);
	}

	died = 0;

	canBeAttacked() {
		return !this.died;
	}

	heal(hp: number) {
		this.owner.stats.health.current += hp;
		this.owner.packets.OnEnterLocalVisibilityClient();
	}

	healPercent(hpPercent: number) {
		this.heal(this.owner.stats.health.total * hpPercent / 100);
	}

}
