import BasePacket from '../BasePacket.js';


export default class ClientCheatDetectionSignal extends BasePacket {
	static struct = {
		signal: 'uint32',
		flags: 'uint32',
	};
}
