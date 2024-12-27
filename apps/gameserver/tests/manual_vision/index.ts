//
//import { Vector2 } from '@repo/geometry';
//
//import Server from './_env';
//import MovementSimulation from '../../game/components/movement-simulation';
//
//import Unit from '../../gameobjects/units/unit';
//import IMovable from '../../gameobjects/traits/IMovable';
//
//
//class manual_vision {
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
//	}
//
//};
//
//
//export default manual_vision;
//