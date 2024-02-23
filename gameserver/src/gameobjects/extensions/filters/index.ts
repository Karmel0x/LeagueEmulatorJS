
import GameObject from '../../game-object';

export default class Filters {

    /**
     * types (Minion/player/...)
     */
    static filterByTypeName<T extends GameObject>(targets: T[], types: string[] | string): T[] {
        types = typeof types === 'string' ? [types] : types;
        return targets.filter(targets => types.includes(targets.type));
    }

    /**
     * types (Minion/player/...)
     */
    static sortByType(targets: GameObject[], types: string[] | string) {
        types = typeof types === 'string' ? [types] : types;
        targets.sort((a, b) => {
            return types.indexOf(a.type) - types.indexOf(b.type);
        });
    }

}
