import { Vector2 } from 'three';
import { TeamId } from '../extensions/traits/team';
import { SpawnConfig } from '.';

export const players: SpawnConfig<{ position: { x: number; y: number; }; rotation: number; }> = {
    [TeamId.order]: {
        0: { position: { x: 25.9, y: 280 }, rotation: 0 },
        1: { position: { x: 25.9, y: 280 }, rotation: 0 },
        2: { position: { x: 25.9, y: 280 }, rotation: 0 },
        3: { position: { x: 25.9, y: 280 }, rotation: 0 },
        4: { position: { x: 25.9, y: 280 }, rotation: 0 },
        5: { position: { x: 25.9, y: 280 }, rotation: 0 },
    },
    [TeamId.chaos]: {
        0: { position: { x: 13948, y: 14202 }, rotation: 0 },
        1: { position: { x: 13948, y: 14202 }, rotation: 0 },
        2: { position: { x: 13948, y: 14202 }, rotation: 0 },
        3: { position: { x: 13948, y: 14202 }, rotation: 0 },
        4: { position: { x: 13948, y: 14202 }, rotation: 0 },
        5: { position: { x: 13948, y: 14202 }, rotation: 0 },
    },
};
