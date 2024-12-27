import { TeamId } from '../extensions/traits/team';

export const players: {
    [teamId: number]: { position: { x: number; y: number; }; rotation: number; }[];
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
