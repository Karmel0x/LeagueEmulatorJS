
import GameObject, { GameObjectOptions } from '../game-object';


export type DummytargetOptions = GameObjectOptions & {

};

export default class Dummytarget extends GameObject {

	constructor(options: DummytargetOptions) {
		super(options);

	}
}
