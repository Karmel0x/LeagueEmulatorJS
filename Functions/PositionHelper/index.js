
const PositionHelper__CENTER_TO_CENTER = require("./CENTER_TO_CENTER");
const PositionHelper__CENTER_TO_EDGE = require("./CENTER_TO_EDGE");
const PositionHelper__EDGE_TO_CENTER = require("./EDGE_TO_CENTER");
const PositionHelper__EDGE_TO_EDGE = require("./EDGE_TO_EDGE");


class PositionHelper extends PositionHelper__CENTER_TO_CENTER {

	static CENTER_TO_CENTER = this;
	static CENTER_TO_EDGE = PositionHelper__CENTER_TO_EDGE;
	static EDGE_TO_CENTER = PositionHelper__EDGE_TO_CENTER;
	static EDGE_TO_EDGE = PositionHelper__EDGE_TO_EDGE;

	static C2C = this.CENTER_TO_CENTER;
	static C2E = this.CENTER_TO_EDGE;
	static E2C = this.EDGE_TO_CENTER;
	static E2E = this.EDGE_TO_EDGE;

}

module.exports = PositionHelper;
