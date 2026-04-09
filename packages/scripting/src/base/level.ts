import type * as positions from "@repo/gamedata/maps/map1/positions/index";
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import type { Vector2Like } from "@repo/geometry";

type LevelEvents = {
    'spawnedStructure': (unit: AttackableUnit) => void;
    'destroyedStructure': (unit: AttackableUnit) => void;
    'respawnedStructure': (unit: AttackableUnit) => void;
};

export type LevelConstants = {
    ambientGoldInterval: number,
    ambientGoldAmount: number,
    ambientGoldDelay: number,
    disableAmbientGoldWhileDead: boolean,

    ambientXPInterval: number,
    ambientXPAmount: number,
    ambientXPDelay: number,
    disableAmbientXPWhileDead: boolean,

    fountainRegenTickInterval: number,
    fountainHealthRegenPercent: number,
    fountainManaRegenPercent: number,
    fountainRegenRadius: number,

    dieExpRadius: number,
    startingGold: number,

    wavesSpawnEnabled: boolean,
    wavesInitialTimeToSpawn: number,
    waveSpawnRate: number,

    /** Damage Ratios */
    dr_HeroToHero: number,
    dr_BuildingToHero: number,
    dr_UnitToHero: number,
    dr_HeroToUnit: number,
    dr_BuildingToUnit: number,
    dr_UnitToUnit: number,
    dr_HeroToBuilding: number,
    dr_BuildingToBuilding: number,
    dr_UnitToBuilding: number,
};

export default class Level {

    readonly eventEmitter = new EventEmitter2<LevelEvents>();

    id = 0;
    diagonal = 0;
    positions!: typeof positions;
    constants!: LevelConstants;

    middleOfMap!: Vector2Like;

    expCurve!: number[];
    deathTimes!: number[];

    mission = {
        experienceSplit: [
            0.92,
            0.55,
            0.367,
            0.275,
            0.22,
        ],
    };

    items = {
        unpurchasableList: [] as number[],
    };

}
