import BasePacket from '../BasePacket';
import SVector2 from '../sharedstruct/SVector2';
import CMovementDataNormal from '../sharedstruct/CMovementDataNormal';

// something is different in BatchPacket
//const Vector2c = {
//    x_: 'uint8',
//    x: 'float',
//    y_: 'uint8',
//    y: 'float',
//};

/**
 * Request move
 */
export default class IssueOrderReq extends BasePacket {
	static types = {
		ORDER_NONE: 0,
		HOLD: 1,
		MOVETO: 2, // right click move
		ATTACKTO: 3, // right click attack
		TEMP_CASTSPELL: 4,
		PETHARDATTACK: 5,
		PETHARDMOVE: 6,
		ATTACKMOVE: 7,
		TAUNT: 8,
		PETHARDRETURN: 9,
		STOP: 10, // s key stop
		PETHARDSTOP: 11,
		USE: 12,
		ATTACKTERRAIN_SUSTAINED: 13,
		ATTACKTERRAIN_ONCE: 14,
		CASTSPELL: 15,
	};
	static struct = {
		orderType: 'uint8',
		position: SVector2,
		targetNetId: 'uint32',
	};
	reader(buffer) {
		super.reader(buffer);

		this.movementData = CMovementDataNormal.reader(buffer);
	}
	writer(buffer) {
		super.writer(buffer);

		if (this.movementData)
			CMovementDataNormal.writer(buffer, this.movementData);
	}
}
