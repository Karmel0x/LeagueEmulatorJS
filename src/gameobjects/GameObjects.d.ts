import { Vector2 } from 'three';
import _Character from '../game/datamethods/characters/_Character';
import Barrack from './spawners/Barrack';
import JungleCamp from './spawners/JungleCamp';
import Unit from './units/Unit';
import Dummytarget from './missiles/Dummytarget';
import Inhibitor from './units/Inhibitor';
import Nexus from './units/Nexus';
import Minion from './units/Minion';
import Turret from './units/Turret';
import Player from './units/Player';
import Monster from './units/Monster';
import Missile from './missiles/Missile';
import Skillshot from './missiles/Skillshot';
import Targetedshot from './missiles/Targetedshot';
import Fountain from './spawners/Fountain';
import _Spell from '../game/datamethods/spells/_Spell';
import SpellCast from '../game/datamethods/spells/SpellCast';

type UnitSpawner = Barrack | JungleCamp | Fountain;
type MissileSpawner = AttackableUnit;

type GameObjectOptions = {
    netId?: number;
    spawnPosition?: Vector2 | { x: number, y: number };
    position?: Vector2 | { x: number, y: number };
};

// -------------------- extensions --------------------

// -------------------- extensions/combat --------------------

type DefendableOptions = {

};

type AttackableOptions = {

};

type SpellableOptions = {

};

// -------------------- extensions/packets --------------------


// -------------------- extensions/traits --------------------

type StatsStatsOptions = {
    health?: number;
    mana?: number;
    healthRegen?: number;
    manaRegen?: number;
    attackDamage?: number;
    abilityPower?: number;
    armor?: number;
    resist?: number;
    attackSpeed?: number;
    crit?: number;
    attackRange?: number;
    moveSpeed?: number;
    attackSpeedMultiplier?: number;//todo
    cooldownReduction?: number;
    lifeSteal?: number;
    spellVamp?: number;
    tenacity?: number;
    perceptionRange?: number;
    size?: number;
    sightRange?: number;
    critDamage?: number;
    collisionRadius?: number;
};

// -------------------- units --------------------

type UnitOptions = GameObjectOptions & {
    spawner?: UnitSpawner;
    character: string;
    team?: number;
    num?: number;
    info?: object;

    stats?: StatsStatsOptions;
};

type InhibitorOptions = UnitOptions & {
    team: number;
    num: number;
};

type MinionOptions = UnitOptions & {
    spawner: Barrack;
};

type MonsterOptions = UnitOptions & {
    spawner: JungleCamp;
};

type NexusOptions = UnitOptions & {
    team: number;
};

type PlayerOptions = UnitOptions & {
    summoner: SummonerConfig;
    spawner: Fountain;
};

type TurretOptions = UnitOptions & {

};

// -------------------- spawners --------------------

type SpawnerOptions = GameObjectOptions & {
    team: number;
    num?: number;
};

type BarrackOptions = SpawnerOptions & {

};

type JungleCampOptions = SpawnerOptions & {
    monsters: MonsterOptions[];
};

type BuilderOptions = SpawnerOptions & {
    nexuses: NexusOptions[];
    inhibitors: InhibitorOptions[];
    turrets: TurretOptions[];
};

type FountainOptions = SpawnerOptions & {
    players: PlayerOptions[];
};

// -------------------- missiles --------------------

type DummytargetOptions = GameObjectOptions & {

};

type MissileOptions = GameObjectOptions & {
    stats: {
        moveSpeed?: number;
        speed?: number;
        attackRange?: number;
        range?: number;
    };
    spawner: MissileSpawner;
    target?: GameTarget;
};

type SkillshotOptions = MissileOptions & {

};

type TargetedshotOptions = MissileOptions & {

};

type BasicAttackOptions = TargetedshotOptions & {
    windupPercent?: number;
    attackSlot?: number;
};

type SpellData = {
    packet: Object;
    spell?: _Spell;
    target?: DefendableUnit | number;
    movingSpell?: boolean;
    spellCast?: SpellCast;
};

// --------------------  --------------------

type SummonerConfig = {
    id: number;
    name: string;
    level: number;
    spells: {
        d: string;
        f: string;
    };
    iconId: number;
    rankId: number;
    ribbonId: number;
};

type PlayerConfig = {
    summoner: SummonerConfig;
    match: {
        team: number;
        num?: number;
        champion: string;
        skin: number;
    };
    runes: [];
    masteries: [];
};

// --------------------  --------------------

type SpellableUnit = Player | Monster;
type AttackableUnit = SpellableUnit | Minion | Turret;
type DefendableUnit = AttackableUnit | Inhibitor | Nexus;

type MovableUnit = Player | Minion | Monster;
type MovableMissile = Missile | Skillshot | Targetedshot;
type MovableObject = MovableUnit | MovableMissile;

type GameTarget = DefendableUnit | Dummytarget;
