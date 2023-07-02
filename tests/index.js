
const list = [
	require('./manual_vision'),
];

let iterations = process.argv[2] ?? 100;
console.log('Starting tests', iterations > 1 ? `(${iterations} iterations per test)` : '');

async function startTests() {
	for (let i in list) {
		await list[i].test(iterations);
	}
}

startTests();
