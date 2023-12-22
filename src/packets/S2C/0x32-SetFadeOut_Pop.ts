import BasePacket from '../BasePacket';


export default class SetFadeOut_Pop extends BasePacket {
	static struct = {
		stackId: 'int16',
	};
}
