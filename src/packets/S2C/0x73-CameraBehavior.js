import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


export default class CameraBehavior extends BasePacket {
	static struct = {
		position: SVector3,
	};
}
