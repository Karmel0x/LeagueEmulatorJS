
const _tests = require("./_tests");


class testName extends _tests {
	
	// ms time which test shall not exceed
	static expectedIterationTime = 1;

	static async prepareTest(){
		// optionally prepare test here
		return true;
	}

	static async processTest(){
		// run functionality to test here
		return true;
	}
	
};


testName.singleTestMaybe();
module.exports = testName;
