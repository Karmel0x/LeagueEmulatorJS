
const _tests = require('../_tests');
const colors = require('../_colors');
const { Vector2 } = require('three');

require('./_env');
const MovementSimulation = require('../../Game/Components/MovementSimulation');

const ExtendWTraits = require('../../Core/ExtendWTraits');
const Unit = require('../../GameObjects/Units/Unit');
const IMovable = require('../../GameObjects/Traits/IMovable');


class TestsMovableUnit extends ExtendWTraits(Unit, IMovable) {}


class manual_vision extends _tests {
	
	static expectedIterationTime = 0;

	static async prepareTest(){

		var unit0 = new TestsMovableUnit({
			spawnPosition: new Vector2(100, 100),
			team: 'RED',
			character: 'Red_Minion_Basic',
		});
		var unit1 = new TestsMovableUnit({
			spawnPosition: new Vector2(200, 200),
			team: 'BLUE',
			character: 'Red_Minion_Basic',
		});
		var unit2 = new TestsMovableUnit({
			spawnPosition: new Vector2(1500, 1500),
			team: 'RED',
			character: 'Red_Minion_Basic',
		});
		var unit3 = new TestsMovableUnit({
			spawnPosition: new Vector2(2000, 2000),
			team: 'BLUE',
			character: 'Red_Minion_Basic',
		});
		
		var movementSimulation = new MovementSimulation();
		movementSimulation.start();

		unit0.move1(new Vector2(1500, 1500));
		setTimeout(() => {
			unit1.move1(new Vector2(1500, 1500));
		}, 7000);

		return true;
	}

	static async processTest(){
		return true;
	}

	static async test(){
		if(global.processingAllTests){
			console.log('test', this.name, '::', `${colors.fgYellow}skipped (need to run manually)${colors.reset}`);
			return;
		}

		await this.prepareTest();
		await this.processTest();
	}

};


manual_vision.singleTestMaybe();
module.exports = manual_vision;
