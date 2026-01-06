// npx typescript-json-schema src/game/game.config.schema.ts ConfigSchema --ignoreErrors -o src/game/game.config.schema.json

import type { NetworkConfig } from '@repo/network/network';
import type Logging from '../core/logging';
import type { PlayerList } from '../gameobjects/spawners/fountain';

export type GameConfig = {
    version: number;
    map: number;
};

export type TestingConfig = {
    "enabled": boolean;
    "adminCommands": boolean;
    "noCooldowns": boolean;
    "noManaCosts": boolean;
    "noHeroDying": boolean;
    "noSpellRangeCheck": boolean;
    "spawnMinionsLine": number;
    "bringHeroesToLine": boolean;
    "levelUpPlayers": number;
    "noAutoGameStart": boolean;
    "wavesInitialTimeToSpawn": number;
    "startingGold": number;
};

export type DebuggingConfig = {
    "enabled": boolean;
    "noTerrainEscape": boolean;
    "noPathFinding": boolean;
    "noSpawners": boolean;
};

export type LoggingConfig = {
    "debug": keyof typeof Logging.output;
    "packet": keyof typeof Logging.output;
};

export type ConfigSchema = {
    server: NetworkConfig;
    game: GameConfig;
    testing: TestingConfig;
    debugging: DebuggingConfig;
    logging: LoggingConfig;
    players: PlayerList;
};
