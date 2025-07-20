import type { SpawnConfig } from '@repo/gameserver/src/gameobjects/spawners/spawner';
import type { InhibitorOptions } from '@repo/gameserver/src/gameobjects/unit-ai/structures/inhibitor';
import type { NexusOptions } from '@repo/gameserver/src/gameobjects/unit-ai/structures/nexus';
import type { TurretOptions } from '@repo/gameserver/src/gameobjects/unit-ai/structures/turret';

export const nexuses: SpawnConfig<NexusOptions>[] = [];

export const inhibitors: SpawnConfig<InhibitorOptions>[] = [];

export const turrets: SpawnConfig<TurretOptions>[] = [];
