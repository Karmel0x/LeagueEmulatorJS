import type { TeamId } from '@repo/gameserver/src/gameobjectextensions/traits/team';
import { BarrackOptions } from '@repo/gameserver/src/gameobjects/spawners/barrack';
import type { Vector2 } from '@repo/geometry';

export const barracks: BarrackOptions[] = [];

export const minionLanePaths: Partial<Record<TeamId, Vector2[][]>> = {};
