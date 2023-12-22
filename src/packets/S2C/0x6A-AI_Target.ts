import BasePacket from '../BasePacket';


export default class AI_Target extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
