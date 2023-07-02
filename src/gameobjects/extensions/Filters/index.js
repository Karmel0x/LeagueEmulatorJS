
/**
 * @typedef {import('../../GameObject')} GameObject
 */

class Filters {

    /**
     * @param {GameObject[]} targets
     * @param {string[] | string} types (Minion/Player/...)
     * @returns {GameObject[]}
     */
    static filterByType(targets, types) {
        types = typeof types == 'string' ? [types] : types;
        return targets.filter(targets => types.includes(targets.type));
    }

    /**
     * @param {GameObject[]} targets
     * @param {string[] | string} types (Minion/Player/...)
     */
    static sortByType(targets, types) {
        types = typeof types == 'string' ? [types] : types;
        targets.sort((a, b) => {
            return types.indexOf(a.type) - types.indexOf(b.type);
        });
    }

}

module.exports = Filters;
