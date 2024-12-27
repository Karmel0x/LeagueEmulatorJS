import type { AttackableUnitOptions } from '../units/attackable-unit';

export type SpawnConfig<T> = AttackableUnitOptions & { aiOptions?: Omit<T, 'owner'> };

export { players } from './heroes';
export { jungleCamps } from './jungle-camps';
export { barracks, minionLanePaths } from './minions';
export { inhibitors, nexuses, turrets } from './structures';

