import ExtendedPacket from '../ExtendedPacket';


export default class AnimationUpdateTimeStep extends ExtendedPacket {
	static struct = {
		updateTimeStep: 'float',
		animationName: 'string0',//64
	};
}
