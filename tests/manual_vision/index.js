//
//import _tests from '../_tests.js';
//import colors from '../_colors.js';
//import { Vector2 } from 'three';
//
//import Server from './_env.js';
//import MovementSimulation from '../../game/components/MovementSimulation.js';
//
//import ExtendWTraits from '../../core/ExtendWTraits.js';
//import Unit from '../../gameobjects/units/Unit.js';
//import IMovable from '../../gameobjects/traits/IMovable.js';
//
//
//class TestsMovableUnit extends ExtendWTraits(Unit, IMovable) { }
//
//
//class manual_vision extends _tests {
//
//	static expectedIterationTime = 0;
//
//	static async prepareTest() {
//
//		let unit0 = new TestsMovableUnit({
//			spawnPosition: new Vector2(100, 100),
//			team: 'RED',
//			character: 'Red_Minion_Basic',
//		});
//		let unit1 = new TestsMovableUnit({
//			spawnPosition: new Vector2(200, 200),
//			team: 'BLUE',
//			character: 'Red_Minion_Basic',
//		});
//		let unit2 = new TestsMovableUnit({
//			spawnPosition: new Vector2(1500, 1500),
//			team: 'RED',
//			character: 'Red_Minion_Basic',
//		});
//		let unit3 = new TestsMovableUnit({
//			spawnPosition: new Vector2(2000, 2000),
//			team: 'BLUE',
//			character: 'Red_Minion_Basic',
//		});
//
//		let movementSimulation = new MovementSimulation();
//		movementSimulation.start();
//
//		unit0.move1(new Vector2(1500, 1500));
//		setTimeout(() => {
//			unit1.move1(new Vector2(1500, 1500));
//		}, 7000);
//
//		return true;
//	}
//
//	static async processTest() {
//		return true;
//	}
//
//	static async test() {
//		if (Server.processingAllTests) {
//			console.log('test', this.name, '::', `${colors.fgYellow}skipped (need to run manually)${colors.reset}`);
//			return;
//		}
//
//		await this.prepareTest();
//		await this.processTest();
//	}
//
//};
//
//
//manual_vision.singleTestMaybe();
//export default manual_vision;
//