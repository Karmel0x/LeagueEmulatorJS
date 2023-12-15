
import PositionHelper__CENTER_TO_CENTER from './CENTER_TO_CENTER.js';


/**
 * @typedef {import('../../GameObject.js')} GameObject
 */

class PositionHelper__CENTER_TO_EDGE extends PositionHelper__CENTER_TO_CENTER {

	/**
	 * @override
	 * @param {GameObject} source
	 * @param {GameObject} target
	 * @param {number} range
	 * @returns {number}
	 */
	static getRangeSum(source, target, range) {
		return range + (target.collisionRadius || 0);
	}

}

export default PositionHelper__CENTER_TO_EDGE;
