import { Vector2 } from "three";
import _Character from "../game/datamethods/characters/_Character";
import Barrack from "./others/Barrack";
import JungleCamp from "./others/JungleCamp";
import Unit from "./units/Unit";
import Dummytarget from "./missiles/Dummytarget";

type GameObjectOptions = {
    netId?: number;
    spawnPosition?: Vector2 | { x: number, y: number };
    position?: Vector2 | { x: number, y: number };
    spawner?: Barrack | JungleCamp | Unit;
    owner?: Barrack | JungleCamp | Unit;
};

// -------------------- Units --------------------

type UnitOptions = GameObjectOptions & {
    character: string | _Character;
    team?: number | string;
    num?: number | string;
    stats?: {
        moveSpeed: number;
    };
    info?: object;
};

type InhibitorOptions = UnitOptions & {
    team: number | string;
    num: number | string;
};

type MinionOptions = UnitOptions & {
    spawner: Barrack;
};

type MonsterOptions = UnitOptions & {
    spawner: JungleCamp;
};

type NexusOptions = UnitOptions & {
    team: number | string;
};

type PlayerOptions = UnitOptions & {

};

type TurretOptions = UnitOptions & {

};

// -------------------- Others --------------------

type BarrackOptions = GameObjectOptions & {
    team: number;
    num: number;
};

type JungleCampOptions = GameObjectOptions & {
    teamName: string;//todo
    monsters: MonsterOptions[];
};

// -------------------- Missiles --------------------

type DummytargetOptions = GameObjectOptions & {

};

type MissileOptions = GameObjectOptions & {
    stats: {
        moveSpeed?: number;
        speed?: number;
        attackRange?: number;
        range?: number;
    };
    owner: Unit;
    target?: Unit | Dummytarget;
};

type SkillshotOptions = MissileOptions & {

};

type TargetedshotOptions = MissileOptions & {

};

// -------------------- Stats --------------------

type StatsOptions = {
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
