import BasePacket from '../BasePacket';


export default class UseObject extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
