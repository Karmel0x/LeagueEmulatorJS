import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';


export default class CameraBehavior extends BasePacket {
	static struct = {
		position: SVector3,
	};
}
