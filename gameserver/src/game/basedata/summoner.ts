
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import _Package from './package';


/**
 * @abstract
 */
export default class _Summoner extends _Package {

	constructor(owner: AttackableUnit) {
		super(owner);

	}

}
