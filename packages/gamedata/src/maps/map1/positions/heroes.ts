import { TeamId } from '@repo/gameserver/src/gameobjectextensions/traits/team';
import type { Vector2Like } from '@repo/geometry';

export const heroes: {
    [teamId: number]: { position: Vector2Like; rotation: number; }[];
} = {
    [TeamId.order]: [
        { position: { x: 25.9, y: 280 }, rotation: 0 },
        { position: { x: 25.9, y: 280 }, rotation: 0 },
        { position: { x: 25.9, y: 280 }, rotation: 0 },
        { position: { x: 25.9, y: 280 }, rotation: 0 },
        { position: { x: 25.9, y: 280 }, rotation: 0 },
        { position: { x: 25.9, y: 280 }, rotation: 0 },
    ],
    [TeamId.chaos]: [
        { position: { x: 13948, y: 14202 }, rotation: 0 },
        { position: { x: 13948, y: 14202 }, rotation: 0 },
        { position: { x: 13948, y: 14202 }, rotation: 0 },
        { position: { x: 13948, y: 14202 }, rotation: 0 },
        { position: { x: 13948, y: 14202 }, rotation: 0 },
        { position: { x: 13948, y: 14202 }, rotation: 0 },
    ],
};
