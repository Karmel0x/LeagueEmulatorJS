
import PositionHelper__CENTER_TO_CENTER from './CENTER_TO_CENTER.js';
import PositionHelper__CENTER_TO_EDGE from './CENTER_TO_EDGE.js';
import PositionHelper__EDGE_TO_CENTER from './EDGE_TO_CENTER.js';
import PositionHelper__EDGE_TO_EDGE from './EDGE_TO_EDGE.js';


class Measure extends PositionHelper__CENTER_TO_CENTER {

	static CENTER_TO_CENTER = this;
	static CENTER_TO_EDGE = PositionHelper__CENTER_TO_EDGE;
	static EDGE_TO_CENTER = PositionHelper__EDGE_TO_CENTER;
	static EDGE_TO_EDGE = PositionHelper__EDGE_TO_EDGE;

	static C2C = this.CENTER_TO_CENTER;
	static C2E = this.CENTER_TO_EDGE;
	static E2C = this.EDGE_TO_CENTER;
	static E2E = this.EDGE_TO_EDGE;

	CENTER_TO_CENTER;
	CENTER_TO_EDGE;
	EDGE_TO_CENTER;
	EDGE_TO_EDGE;

	constructor(gameObject) {
		super(gameObject);

		this.CENTER_TO_CENTER = this;
		this.CENTER_TO_EDGE = new PositionHelper__CENTER_TO_EDGE(gameObject);
		this.EDGE_TO_CENTER = new PositionHelper__EDGE_TO_CENTER(gameObject);
		this.EDGE_TO_EDGE = new PositionHelper__EDGE_TO_EDGE(gameObject);

		this.C2C = this.CENTER_TO_CENTER;
		this.C2E = this.CENTER_TO_EDGE;
		this.E2C = this.EDGE_TO_CENTER;
		this.E2E = this.EDGE_TO_EDGE;
	}
}

export default Measure;
