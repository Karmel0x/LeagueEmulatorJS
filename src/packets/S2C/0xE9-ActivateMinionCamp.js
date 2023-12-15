import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';

/**
 * Activate Monster Camp
 */
export default class ActivateMinionCamp extends BasePacket {
	static struct = {
		position: SVector3,
		spawnDuration: 'float',
		campIndex: 'uint8',
		timerType: 'int32',
	};
}
