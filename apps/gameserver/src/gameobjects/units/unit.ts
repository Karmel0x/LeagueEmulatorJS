
import Character from '@repo/scripting/base/character';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import type { LevelableEvents } from '../../gameobjectextensions/progress/levelable';
import Rewards from '../../gameobjectextensions/traits/rewards';
import TeamArrangement, { TeamId } from '../../gameobjectextensions/traits/team';
import GameObject, { type GameObjectEvents, type GameObjectOptions } from '../game-object';
import type Spawner from '../spawners/spawner';

export type UnitOptions = GameObjectOptions & {
	spawner?: Spawner;
	name: string;
	character: string;
	team?: number;
	//stats?: StatsUnitOptions;
	skin?: string;
};

export type UnitEvents = GameObjectEvents & LevelableEvents & {

};

export default class Unit extends GameObject {
	static initialize(options: UnitOptions) {
		return super.initialize(options) as Unit;
	}

	readonly eventEmitter = new EventEmitter2<UnitEvents>();

	spawner?: Spawner;
	name!: string;
	character!: Character;
	characterId = 0;
	rewards!: Rewards;
	team!: TeamArrangement;

	id = 0;

	revealedUntil = 0;
	visionRange = 0;
	//visibleForEnemy = false;
	//visibleForEnemy2 = false;
	//visibleForTeam = false;
	//visibleForTeam2 = true;

	slots: { [s: string]: any; } = {};

	_skin: string | undefined = undefined;

	get skin() {
		return this._skin || this.character.name;
	}

	set skin(value: string | undefined) {
		this._skin = value;
	}

	constructor(options: UnitOptions) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		super(options);
		this.options = options;
		this.spawner = options.spawner;
		this.skin = options.skin;
	}

	switchCharacter(characterName: string) {
		const character1 = new Character();
		//character1.name = characterName;
		this.character = character1;
		this.characterId++;
	}

	loader(options: UnitOptions) {
		this.name = options.name;
		this.switchCharacter(options.character);

		this.rewards = new Rewards(this);
		this.team = new TeamArrangement(this, options.team ?? TeamId.unknown);

		super.loader(options);
	}

	respawn() {
		if (this.position)
			this.position.copy(this.spawnPosition);
	}

	revealUntil(time: number) {
		this.revealedUntil = Math.max(this.revealedUntil, time);
	}

	reveal(duration: number) {
		const now = Server.gameLoop.timer;
		this.revealUntil(now + duration);
	}

}
