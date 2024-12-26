
import Server from '../../app/server';
import GameObject, { GameObjectEvents, GameObjectOptions } from '../game-object';
import PUnit from '../extensions/packets/unit';
import Buffs from '../extensions/traits/buffs';
import Levelable from '../extensions/progress/levelable';
import Rewards from '../extensions/traits/rewards';
import StatsUnit, { StatsUnitOptions } from '../extensions/stats/unit';
import TeamArrangement, { LaneId, TeamId } from '../extensions/traits/team';
import _Character from '../../game/basedata/characters/character';
import * as Characters from '@repo/gamedata/characters/index';
import { EventEmitter } from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import Spawner from '../spawners/spawner';
import _Spell from '../../game/basedata/spells/spell';


export type UnitOptions = GameObjectOptions & {
	spawner?: Spawner;
	character: string;
	team?: number;
	num?: number;
	info?: {
		name: string;
	};

	stats?: StatsUnitOptions;
};

export type UnitEvents = GameObjectEvents & {
	'spawn': () => void;
}

export default class Unit extends GameObject {
	static initialize(options: UnitOptions) {
		return super.initialize(options) as Unit;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<UnitEvents>;

	info!: UnitOptions['info'];
	declare stats: StatsUnit;
	packets!: PUnit;
	buffs!: Buffs;
	progress!: Levelable;
	rewards!: Rewards;
	team!: TeamArrangement;

	id = 0;

	visionRange = 0;
	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

	slots: { [s: string]: _Spell; } = {};

	character?: _Character;

	switchCharacter(characterName: string) {
		let Character = Characters[characterName as keyof typeof Characters] as typeof _Character;
		if (!Character)
			return;

		let character = new Character(this);
		this.character = character;
	}

	spawner?: Spawner;

	loader(options: UnitOptions) {
		this.switchCharacter(options.character);
		this.info = options.info;

		this.packets = this.packets || new PUnit(this);
		this.buffs = new Buffs(this);
		this.progress = this.progress || new Levelable(this);
		this.stats = this.stats || new StatsUnit(this, options.stats || this.character?.stats || {});
		this.rewards = new Rewards(this);
		this.team = new TeamArrangement(this, options.team ?? TeamId.unknown, options.num || LaneId.unknown);

		super.loader(options);
		this.update();
	}

	constructor(options: UnitOptions) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		super(options);
		this.options = options;
		this.spawner = options.spawner;
	}

	initialized() {
		console.log('initialized', this.constructor.name, this.netId);
		this.eventEmitter.emit('initialized');
		//this.progress.levelUp();
		this.spawn();
		this.loop();
	}

	spawn() {
		this.stats.health.current = this.stats.health.total;
		this.stats.mana.current = this.stats.mana.total;

		if (this.position)
			this.position.copy(this.spawnPosition);

		this.packets.OnEnterLocalVisibilityClient();
		Server.teams[this.team.id]?.vision(this, true);
		this.eventEmitter.emit('spawn');
	}

	async loop() {

	}

	async update() {
		for (; ;) {
			await Promise.delay(1000);

			if (!Server.game.started)
				continue;

		}
	}

}
