
import Unit from '../../units/unit';


/**
 * Trait for units that can be leveled up
 */
export default class Levelable {
    owner;

    constructor(owner: Unit) {
        this.owner = owner;
    }

    level = 1;

    /**
     * level up
     */
    levelUp() {
        if (this.level >= 18)
            return;

        ++this.level;
        console.log('levelUp', this.level);
    }

}
