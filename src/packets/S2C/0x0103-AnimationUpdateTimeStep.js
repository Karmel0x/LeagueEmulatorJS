import ExtendedPacket from '../ExtendedPacket.js';


export default class AnimationUpdateTimeStep extends ExtendedPacket {
	static struct = {
		updateTimeStep: 'float',
		animationName: 'string0',//64
	};
}
