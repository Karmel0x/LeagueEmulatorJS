import { Vector2 } from '@repo/geometry';

export type Pos2D = { x: number; y: number };

export const teamColors = {
	idle: ['#888', '#4fc3f7', '#f47a7a'] as const,
	moving: ['#aaa', '#2196f3', '#e94560'] as const,
};

export type Entity = {
	position: Vector2;
	collisionRadius: number;
	ignoreCollision: boolean;
	isMoving: boolean;
	direction: Vector2;
	speed: number;
	waypoints: Pos2D[];
	premovePosition: Vector2;
	team: number;
	destination: Pos2D | null;
	trail: Pos2D[];
	testPoints: (Pos2D & { color: string })[];
	// combat
	isRange: boolean;
	hp: number;
	maxHp: number;
	attackRange: number;
	attackDamage: number;
	attackCooldown: number;
	attackTimer: number;
	target: Entity | null;
	dead: boolean;
};

export type Projectile = {
	position: Pos2D;
	target: Entity;
	speed: number;
	damage: number;
	team: number;
};

export const entities: Entity[] = [];
export const projectiles: Projectile[] = [];

export const state = {
	selectedUnit: null as Entity | null,
	dragging: null as Entity | null,
	dragOffset: { x: 0, y: 0 } as Pos2D,
	spawnTeam: 1,
	collisionCount: 0,
};
