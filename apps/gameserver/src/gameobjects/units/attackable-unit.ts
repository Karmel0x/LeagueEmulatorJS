
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import Server from '../../app/server';
import { SlotId } from '../../constants/slot-id';
import { EventEmitter2 } from '../../core/event-emitter2';
import type Spell from '../../game/basedata/spell';
import { sendUnitStats } from '../../packet-helpers';
import Attackable, { AttackableEvents } from '../extensions/combat/attackable';
import MovingUnit, { MovingUnitEvents } from '../extensions/moving/unit';
import PUnit from '../extensions/packets/unit';
import Progressable, { type ProgressableEvents } from '../extensions/progress/progressable';
import StatsUnit from '../extensions/stats/unit';
import BuffManager from '../extensions/traits/buff-manager';
import Inventory from '../extensions/traits/inventory';
import type Missile from '../missiles/missile';
import type BaseAi from '../unit-ai/base-ai';
import Unit, { UnitEvents, UnitOptions } from './unit';


export type AttackableUnitOptions = UnitOptions & {

};

export type AttackableUnitEvents = UnitEvents & AttackableEvents & MovingUnitEvents & ProgressableEvents & {
	'preFireMissile': (missile: Missile, spell?: Spell) => void;
	'preCastSpell': (spell: Spell, targets: AttackableUnit[], e: {
		sendSpellCast: boolean,
		sendMissileReplication: boolean,
		castTime: number,
		totalTime: number,
	}) => void;
	'cancelSpellCast': (spell: Spell) => void;
};

export default class AttackableUnit extends Unit {
	static initialize(options: AttackableUnitOptions) {
		return super.initialize(options) as AttackableUnit;
	}

	readonly eventEmitter = new EventEmitter2<AttackableUnitEvents>();

	ai!: BaseAi;
	declare stats: StatsUnit;

	lastOrderId = 0;
	issuedOrder = IssueOrderType.orderNone;

	packets!: PUnit;
	moving!: MovingUnit;
	combat!: Attackable;
	inventory!: Inventory;
	buffManager!: BuffManager;
	progress!: Progressable;

	constructor(options: AttackableUnitOptions) {
		super(options);
		this.eventEmitter.setMaxListeners(100);
	}

	switchCharacter(characterName: string) {
		if (this.character) {
			this.character.eventEmitter.emit('deactivate', this);
		}

		super.switchCharacter(characterName);
		this.stats = new StatsUnit(this);
		this.stats = Object.assign(this.stats, this.character.createStats(this));

		if (this.character) {
			(async () => {
				await this.waitForSpawn();
				this.character.eventEmitter.emit('activate', this);
			})();
		}
	}

	loader(options: AttackableUnitOptions) {
		this.packets = new PUnit(this);
		this.moving = new MovingUnit(this);
		this.combat = new Attackable(this);
		this.inventory = new Inventory(this);
		this.buffManager = new BuffManager(this);
		this.progress = new Progressable(this);

		super.loader(options);

		this.eventEmitter.once('spawn', () => {

			// TODO
			setInterval(() => {
				sendUnitStats(this);
			}, 1000 * 60);
			// TODO
			setTimeout(() => {
				sendUnitStats(this);
			}, 200);
		});

		this.eventEmitter.on('death', () => {
			this.moving.setWaypoints([]);
		});

	}

	spawn() {
		super.spawn();

		setTimeout(() => {
			this.packets.OnEnterLocalVisibilityClient();
			Server.teams[this.team.id]?.vision(this, true);
		}, 100);
	}

	onDie(source: AttackableUnit, assists: AttackableUnit[]) {

	}

	/**
	 * Returns if unit is able to move
	 */
	isAbleForMoving() {
		if (!this.moving)
			return false;

		if (this.combat.died)
			return false;

		return true;
	}

	/**
	 * Returns if unit is able to attack
	 */
	isAbleForAttacking() {
		if (!this.slots[SlotId.a])
			return false;

		if (this.combat.died)
			return false;

		return true;
	}

}
