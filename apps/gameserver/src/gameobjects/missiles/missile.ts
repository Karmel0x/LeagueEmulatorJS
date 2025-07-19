
import type { Vector2, Vector2Like } from '@repo/geometry';
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import * as Measure from '../extensions/measure';
import StatsMissile, { type StatsMissileOptions } from '../extensions/stats/missile';
import { TeamId } from '../extensions/traits/team';
import MovableGameObject, { type MovableGameObjectEvents, type MovableGameObjectOptions } from '../movable-game-object';
import type AttackableUnit from '../units/attackable-unit';


export type MissileEvents = MovableGameObjectEvents & {
}

export type MissileOptions = MovableGameObjectOptions & {
	stats: StatsMissileOptions;
	spawner: AttackableUnit;
	target?: AttackableUnit;
};

export default class Missile extends MovableGameObject {
	static initialize(options: MissileOptions) {
		return super.initialize(options) as Missile;
	}

	static makePositionForSkillshot({ startPosition, endPosition, range, radius }: { startPosition: Vector2Like, endPosition: Vector2Like, range: number, radius: number }) {
		const finalRange = range - (radius / 2);// idk if it is correct here, corners on max range will not hit
		const position = Measure.centerToCenter.getPositionBetweenRange(startPosition, endPosition, finalRange);
		return position;
	}

	readonly eventEmitter = new EventEmitter2<MissileEvents>();

	declare options: MissileOptions;
	spawner;

	declare stats: StatsMissile;
	target;

	get owner() {
		return this.spawner;
	}

	constructor(options: MissileOptions) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;

		super(options);
		this.options = options || {};
		this.spawner = options.spawner;
		this.target = options.target;
	}

	loader(options: MissileOptions) {
		options.stats.attackRange = options.stats.attackRange || options.stats.range || 1;
		options.stats.collisionRadius = options.stats.collisionRadius || options.stats.radius || 1;
		options.stats.moveSpeed = options.stats.moveSpeed || options.stats.speed || 1;

		this.stats = new StatsMissile(this, options.stats || {});

		this.eventEmitter.on('reachDestination', () => {
			this.owner.eventEmitter.emit('missileEnd', this);
			setTimeout(() => {
				this.eventEmitter.emit('destroy');
			}, 0);
		});

		super.loader(options);
	}

	fire(destination: Vector2) {
		if (!this.spawned) {
			this.spawn();
			this.owner.eventEmitter.emit('launchMissile', this, destination);
		}

		this.moving.setWaypoints([destination]);
	}

	destroy() {
		// TODO
		const packet1 = packets.DestroyClientMissile.create({
			netId: this.netId,
		});
		Server.teams[TeamId.max]!.sendPacket_withVision(packet1);
	}
}
