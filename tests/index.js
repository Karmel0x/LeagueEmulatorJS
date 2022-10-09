
global.processingAllTests = true;

const list = [
	require('./manual_vision'),
];

var iterations = process.argv[2] ?? 100;
console.log('Starting tests', iterations > 1 ? `(${iterations} iterations per test)` : '');

async function startTests(){
	for(var i in list){
		await list[i].test(iterations);
	}
}

startTests();
