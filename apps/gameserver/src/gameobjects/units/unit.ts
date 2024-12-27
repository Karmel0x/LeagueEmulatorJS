
import * as Characters from '@repo/gamedata/data/characters/index';
import { EventEmitter2 } from '../../core/event-emitter2';
import type Character from '../../game/basedata/character';
import type { LevelableEvents } from '../extensions/progress/levelable';
import Rewards from '../extensions/traits/rewards';
import TeamArrangement, { TeamId } from '../extensions/traits/team';
import GameObject, { GameObjectEvents, GameObjectOptions } from '../game-object';
import Spawner from '../spawners/spawner';

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
	rewards!: Rewards;
	team!: TeamArrangement;

	id = 0;

	visionRange = 0;
	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

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
		let Character1 = Characters[characterName as keyof typeof Characters] as unknown as typeof Character;
		if (!Character1) {
			console.error('Character not found:', characterName);
			return;
		}

		let character = new Character1();
		character.name = characterName;
		this.character = character;
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

}
