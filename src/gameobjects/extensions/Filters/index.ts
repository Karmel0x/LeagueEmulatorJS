
import GameObject from '../../GameObject';

export default class Filters {

    /**
     * types (Minion/Player/...)
     */
    static filterByTypeName(targets: GameObject[], types: string[] | string): GameObject[] {
        types = typeof types === 'string' ? [types] : types;
        return targets.filter(targets => types.includes(targets.type));
    }

    /**
     * types (Minion/Player/...)
     */
    static sortByType(targets: GameObject[], types: string[] | string) {
        types = typeof types === 'string' ? [types] : types;
        targets.sort((a, b) => {
            return types.indexOf(a.type) - types.indexOf(b.type);
        });
    }

}
