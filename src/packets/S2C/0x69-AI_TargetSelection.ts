import BasePacket from '../BasePacket';

export default class AI_TargetSelection extends BasePacket {
	static struct = {
		targetNetIds: ['uint32', 5],
	};
}
