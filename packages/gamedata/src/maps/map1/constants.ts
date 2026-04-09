import type { LevelConstants } from '@repo/scripting/base/level';

// TODO: use real values
const constants: LevelConstants = {
    ambientGoldInterval: 5,
    ambientGoldAmount: 10,
    ambientGoldDelay: 90,
    disableAmbientGoldWhileDead: false,

    ambientXPInterval: 5,
    ambientXPAmount: 0,
    ambientXPDelay: 0,
    disableAmbientXPWhileDead: false,

    fountainRegenTickInterval: 1,
    fountainHealthRegenPercent: 0.1,
    fountainManaRegenPercent: 0.1,
    fountainRegenRadius: 1100,

    dieExpRadius: 1600,
    startingGold: 475,

    wavesSpawnEnabled: true,
    wavesInitialTimeToSpawn: 90,
    waveSpawnRate: 30,

    dr_HeroToHero: 1,
    dr_BuildingToHero: 1.05,
    dr_UnitToHero: 0.7,
    dr_HeroToUnit: 1,
    dr_BuildingToUnit: 1.105,
    dr_UnitToUnit: 1,
    dr_HeroToBuilding: 1,
    dr_BuildingToBuilding: 1,
    dr_UnitToBuilding: 0.5,
};

export default constants;
