// typescript-json-schema game.config.schema.ts ConfigSchema --ignoreErrors -o game.config.schema.json

import type { NetworkConfig } from '@repo/network/network';
import type { PlayerList } from '../gameobjects/spawners/fountain';

export type ConfigSchema = {
    server: NetworkConfig;
    version: number;
    map: number;
    players: PlayerList;
};
