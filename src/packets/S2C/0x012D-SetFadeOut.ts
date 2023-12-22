import ExtendedPacket from '../ExtendedPacket';


export default class SetFadeOut extends ExtendedPacket {
	static struct = {
		fadeTime: 'float',
		fadeTargetValue: 'float',
	};
}
