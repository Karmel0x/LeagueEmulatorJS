import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

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
