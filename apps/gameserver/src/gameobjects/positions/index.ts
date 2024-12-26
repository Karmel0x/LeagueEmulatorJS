
export type SpawnConfigByTeam<T> = {
    [num: number]: Omit<Omit<T, 'team'>, 'num'>
};

export type SpawnConfig<T> = {
    [team: number]: {
        [num: number]: Omit<Omit<T, 'team'>, 'num'>
    }
};

export { nexuses, inhibitors, turrets } from './structures';
export { barracks, minionLanePaths } from './minions';
export { jungleCamps } from './jungle-camps';
export { players } from './heroes';
