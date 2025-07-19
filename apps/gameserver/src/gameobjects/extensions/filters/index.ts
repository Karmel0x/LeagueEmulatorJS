
import type GameObject from '../../game-object';
import type { AiType } from '../../unit-ai/types';
import type AttackableUnit from '../../units/attackable-unit';

export default class Filters {

    static filterByTypeName<T extends GameObject>(targets: T[], types: string[] | string): T[] {
        types = typeof types === 'string' ? [types] : types;
        return targets.filter(target => types.includes(target.type));
    }

    static sortByType(targets: GameObject[], types: string[] | string) {
        types = typeof types === 'string' ? [types] : types;
        targets.sort((a, b) => {
            return types.indexOf(a.type) - types.indexOf(b.type);
        });
    }

    static sortByAiType(targets: AttackableUnit[], types: AiType[] | AiType) {
        types = typeof types !== 'object' ? [types] : types;
        targets.sort((a, b) => {
            if (!a.ai)
                return 0;
            if (!b.ai)
                return 0;

            return types.indexOf(a.ai.type) - types.indexOf(b.ai.type);
        });
    }

}
