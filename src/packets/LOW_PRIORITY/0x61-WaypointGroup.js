import BasePacket from '../BasePacket.js';
import CMovementDataNormal from '../sharedstruct/CMovementDataNormal.js';

export default class WaypointGroup extends BasePacket {
	static struct = {
		syncId: 'int32',
		count: 'int16',
	};

	writer(buffer) {
		this.syncId = this.syncId || performance.now();
		this.movementData = this.movementData || [this];
		this.count = this.count ?? this.movementData.length;
		super.writer(buffer);

		for (let i = 0; i < this.count; i++)
			CMovementDataNormal.writer(buffer, this.movementData[i]);
	}
	reader(buffer) {
		super.reader(buffer);

		this.movementData = [];
		for (let i = 0; i < this.count; i++)
			this.movementData[i] = CMovementDataNormal.reader(buffer);
	}
}
