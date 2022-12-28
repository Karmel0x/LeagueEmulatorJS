
const PositionHelper__CENTER_TO_CENTER = require("./CENTER_TO_CENTER");


class PositionHelper__EDGE_TO_CENTER extends PositionHelper__CENTER_TO_CENTER {

	/**
	 * @override
	 * @param {GameObject} source
	 * @param {GameObject} target
	 * @param {Number} range
	 * @returns {Number}
	 */
	static getRangeSum(source, target, range) {
		return range + (source.collisionRadius || 0);
	}

}

module.exports = PositionHelper__EDGE_TO_CENTER;
