import BasePacket from '../BasePacket';


export default class LevelUp extends BasePacket {
	static struct = {
		level: 'uint8',
		aveliablePoints: 'uint8',
	};
}
