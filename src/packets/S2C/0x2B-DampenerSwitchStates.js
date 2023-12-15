import BasePacket from '../BasePacket.js';


export default class DampenerSwitchStates extends BasePacket {
	static states = {
		DEAD: 0,
		ALIVE: 1,
	};

	static struct = {
		state: 'uint8',
		duration: 'uint16',
	};
}
