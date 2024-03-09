
import GameObject, { GameObjectOptions } from '../game-object';
import { GameTarget } from './missile';


export type DummytargetOptions = GameObjectOptions & {

};

export default class Dummytarget extends GameObject {
	static initialize(options: DummytargetOptions) {
		return super.initialize(options) as Dummytarget;
	}

	constructor(options: DummytargetOptions) {
		super(options);

	}
}
