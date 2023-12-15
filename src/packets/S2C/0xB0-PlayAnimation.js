import BasePacket from '../BasePacket.js';


export default class PlayAnimation extends BasePacket {
	static struct = {
		animationFlags: 'uint8',
		scaleTime: 'float',
		startProgress: 'float',
		speedRatio: 'float',
		animationName: 'string0',//64
	};
}
