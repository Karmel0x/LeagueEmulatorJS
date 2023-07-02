const colors = require("./_colors");
const Server = require("./manual_vision/_env");

class _tests {

	static expectedIterationTime = 1;

	/**
	 * function to prepare test
	 * for example, functionality that will run one time on program start
	 * @abstract
	 * @returns
	 */
	static async prepareTest() {
		return true;
	}

	/**
	 * the actual functionality of the test
	 * should return true to pass
	 * @abstract
	 * @returns
	 */
	static async processTest() {
		return false;
	}

	// --------------------------------------------------------------------------

	static _iterations = 1;

	/**
	 * measuring method
	 * @param {number} iterations 
	 */
	static async test(iterations = 1) {
		this._iterations = iterations;
		let expectedTime = this.expectedIterationTime * iterations;

		process.stdout.write(`testing ${this.name}`);
		if (!Server.processingAllTests && iterations > 1)
			process.stdout.write(` (${iterations} iterations)`);
		if (expectedTime > 0)
			process.stdout.write(` (expecting ${colors.fgYellow}${expectedTime}${colors.reset} ms)`);
		process.stdout.write(` :: `);

		let prepared = await this.prepareTest();
		if (!prepared) {
			process.stdout.write(colors.fgRed);
			process.stdout.write(`failed preparing test`);
			console.log(colors.reset);
			return;
		}

		let passed = false;
		let i = 1, l = iterations;
		let timeBefore = performance.now();

		for (; i <= l; i++) {
			let result = await this.processTest();

			if (result !== true) {
				passed = false;
				process.stdout.write(colors.fgRed);
				process.stdout.write(`failed (at iteration: ${i}/${iterations} :: returned '${result}')`);
				break;
			}
			if (expectedTime > 0 && performance.now() - timeBefore > expectedTime) {
				passed = false;
				process.stdout.write(colors.fgRed);
				process.stdout.write(`failed (at iteration: ${i}/${iterations} :: running too long)`);
				break;
			}
			passed = true;
		}

		let timeAfter = performance.now();
		let timeElapsed = Math.round((timeAfter - timeBefore) * 1000) / 1000;

		if (passed) {
			process.stdout.write(colors.fgGreen,);
			process.stdout.write('passed');
		}
		process.stdout.write(colors.reset);
		process.stdout.write(` :: `);
		process.stdout.write(`${colors.fgYellow}${timeElapsed}${colors.reset} ms`);
		console.log('');

	}

	static singleTestMaybe() {
		if (!Server.processingAllTests) {
			this.test(process.argv[2] ?? 1);
		}
	}

};

module.exports = _tests;
