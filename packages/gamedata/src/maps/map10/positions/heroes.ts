import { TeamId } from "@repo/gameserver/src/gameobjectextensions/traits/team";
import type { Vector2Like } from "@repo/geometry";

export const heroes: {
    [teamId: number]: { position: Vector2Like; rotation: number; }[];
} = {
    [TeamId.order]: [
        { position: { x: 1050, y: 7300 }, rotation: 0 },
        { position: { x: 1050, y: 7300 }, rotation: 0 },
        { position: { x: 1050, y: 7300 }, rotation: 0 },
        { position: { x: 1050, y: 7300 }, rotation: 0 },
        { position: { x: 1050, y: 7300 }, rotation: 0 },
        { position: { x: 1050, y: 7300 }, rotation: 0 },
    ],
    [TeamId.chaos]: [
        { position: { x: 14360, y: 7300 }, rotation: 0 },
        { position: { x: 14360, y: 7300 }, rotation: 0 },
        { position: { x: 14360, y: 7300 }, rotation: 0 },
        { position: { x: 14360, y: 7300 }, rotation: 0 },
        { position: { x: 14360, y: 7300 }, rotation: 0 },
        { position: { x: 14360, y: 7300 }, rotation: 0 },
    ],
};
