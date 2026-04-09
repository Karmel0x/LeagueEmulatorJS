
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import type Spell from '@repo/scripting/base/spell';
import type { CastData } from '@repo/scripting/base/spell';
import { getCharacter } from '@repo/scripting/load/character';
import Server from '../../app/server';
import { SlotId } from '../../constants/slot-id';
import { EventEmitter2 } from '../../core/event-emitter2';
import { runAccurateInterval } from '../../core/timer';
import type Game from '../../game/initializers/game';
import Attackable, { type AttackableEvents } from '../../gameobjectextensions/combat/attackable';
import MovingUnit, { type MovingUnitEvents } from '../../gameobjectextensions/moving/unit';
import PUnit from '../../gameobjectextensions/packets/unit';
import Progressable, { type ProgressableEvents } from '../../gameobjectextensions/progress/progressable';
import { IStat } from '../../gameobjectextensions/stats/istat';
import StatsUnit from '../../gameobjectextensions/stats/unit';
import BuffManager from '../../gameobjectextensions/traits/buff-manager';
import CharacterState from '../../gameobjectextensions/traits/character-state';
import Inventory from '../../gameobjectextensions/traits/inventory';
import Talented from '../../gameobjectextensions/traits/talented';
import type Missile from '../missiles/missile';
import type BaseAi from '../unit-ai/base-ai';
import Unit, { type UnitEvents, type UnitOptions } from './unit';


export type AttackableUnitOptions = UnitOptions & {

};

export type AttackableUnitEvents = UnitEvents & AttackableEvents & MovingUnitEvents & ProgressableEvents & {
	'preFireMissile': (missile: Missile, spell?: Spell) => void;
	'preCastSpell': (castData: CastData, targets: AttackableUnit[], e: {
		sendSpellCast: boolean,
		sendMissileReplication: boolean,
		castTime: number,
		totalTime: number,
	}) => void;
	'cancelSpellCast': (castData: CastData) => void;
	'updateStats': (updateTime: number) => void;
	'updateActions': (updateTime: number) => void;
	'updateAmmo': () => void;
	'becomeZombie': () => void;
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
	isZombie = false;

	packets!: PUnit;
	moving!: MovingUnit;
	combat!: Attackable;
	inventory!: Inventory;
	talented!: Talented;
	buffManager!: BuffManager;
	progress!: Progressable;
	characterState!: CharacterState;

	constructor(options: AttackableUnitOptions) {
		super(options);
		this.eventEmitter.setMaxListeners(100);
	}

	switchCharacter(characterName: string) {
		if (this.character) {
			this.character.eventEmitter.emit('deactivate', this);
		}

		//console.log('switchCharacter', characterName);
		const character1 = getCharacter(characterName);
		if (character1) {
			this.character = character1;
			this.characterId++;

			const stats = character1.createStats(this);
			this.stats = new StatsUnit(this);
			this.stats.pin(stats);

			this.atBeforeSpawned(() => {
				character1.eventEmitter.emit('activate', this);
			});
			return;
		}

		super.switchCharacter(characterName);
	}

	loader(options: AttackableUnitOptions) {
		this.packets = new PUnit(this);
		this.moving = new MovingUnit(this);
		this.combat = new Attackable(this);
		this.inventory = new Inventory(this);
		this.talented = new Talented(this);
		this.buffManager = new BuffManager(this);
		this.progress = new Progressable(this);
		this.characterState = new CharacterState(this);

		super.loader(options);

		this.eventEmitter.once('spawn', () => {
			this.updateStatsLoop();
			this.updateActionsLoop();
			this.markReplicateStats();
		});

		this.eventEmitter.on('death', () => {
			this.moving.setWaypoints([]);
		});

	}

	updateStats(updateTime: number) {
		const statsArray = Object.values(this.stats);
		for (let i = 0; i < statsArray.length; i++) {
			const stat = statsArray[i];
			if (!(stat instanceof IStat))
				continue;

			stat.flatBonus = 0;
			stat.percentBonus = 0;
		}

		const characterState = this.characterState;

		characterState.canAttack = true;
		characterState.canCast = true;
		characterState.canMove = true;
		characterState.stealthed = false;
		characterState.revealSpecificUnit = false;
		characterState.taunted = false;
		characterState.feared = false;
		characterState.suppressed = false;
		characterState.sleep = false;
		characterState.nearSight = false;
		characterState.ghosted = false;
		characterState.ghostProof = false;
		characterState.charmed = false;
		characterState.noRender = false;
		characterState.forceRenderParticles = false;
		characterState.dodgePiercing = false;
		//characterState.disableAmbientGold = false;
		//characterState.disableAmbientXp = false;
		characterState.brushVisibilityFake = false;

		characterState.ignoreCallForHelp = false;
		characterState.suppressCallForHelp = false;
		characterState.callForHelpSuppresser = false;
		//characterState.minionAcquirable = false;
		characterState.slowed = false;
		characterState.selectable = true;

		characterState.asleep = false;
		characterState.disarmed = false;
		characterState.silenced = false;
		//characterState.pacified = false;
		characterState.netted = false;
		characterState.rooted = false;
		characterState.stunned = false;
		characterState.invulnerable = false;
		characterState.magicImmune = false;
		characterState.physicalImmune = false;
		characterState.targetable = true;

		this.eventEmitter.emit('updateStats', updateTime);
	}

	refreshStats() {
		this.updateStats(0);
		this.markReplicateStats();
	}

	//async setUpdateStatsForDuration(callback: () => void, duration: number) {
	//	const updateStats = this.eventEmitter.on2('updateStats', callback);
	//	this.updateStats();
	//
	//	await accurateDelay(duration);
	//	this.eventEmitter.off('updateStats', updateStats);
	//	this.updateStats();
	//}

	async updateStatsLoop() {
		const stopInterval1 = runAccurateInterval((updateTime) => {
			if (this.combat.died) {
				if (!this.combat.respawnable) {
					stopInterval1();
					return;
				}

				return;
			}

			this.updateStats(updateTime);
		}, 1000);
	}

	updateActions(updateTime: number) {
		this.eventEmitter.emit('updateActions', updateTime);
	}

	async updateActionsLoop() {
		const stopInterval1 = runAccurateInterval((updateTime) => {
			if (this.combat.died) {
				if (!this.combat.respawnable) {
					stopInterval1();
					return;
				}

				return;
			}

			this.updateActions(updateTime);
		}, 1000);
	}

	markReplicateStats() {
		if (this.characterState.noRender || this.character.neverRender)
			return;

		const gameConstructor = Server.game.constructor as typeof Game;
		const replicateStats = gameConstructor.replicateStats;
		if (!replicateStats)
			return;

		const unitsToReplicate = replicateStats.units;

		if (unitsToReplicate.includes(this))
			return;

		unitsToReplicate.push(this);
	}

	spawn() {
		super.spawn();

		if (this.characterState.noRender || this.character.neverRender)
			return;

		//setTimeout(() => {
		Server.teams[this.team.id]?.vision(this, true);
		this.packets.sendOnEnterLocalVisibilityClient();
		//}, 100);
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

	issueOrder(order: IssueOrderType) {
		this.lastOrderId++;
		this.issuedOrder = order;
		this.eventEmitter.emit('changeOrder', order);
	}

}
