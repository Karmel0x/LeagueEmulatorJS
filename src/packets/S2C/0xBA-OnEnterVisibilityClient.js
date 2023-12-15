import BasePacket from '../BasePacket.js';
import SVector2 from '../sharedstruct/SVector2.js';
import SVector3 from '../sharedstruct/SVector3.js';

import CMovementDataNormal from '../sharedstruct/CMovementDataNormal.js';
import CMovementDataWithSpeed from '../sharedstruct/CMovementDataWithSpeed.js';

const Packet = {
	size: 'uint16',
	data: ['uint8', 'size'],
};
const ItemData = {
	slot: 'uint8',
	itemsInSlot: 'uint8',
	spellCharges: 'uint8',
	itemId: 'uint32',
};
const ShieldValues = {
	magical: 'float',
	physical: 'float',
	magicalAndPhysical: 'float',
};
const CharacterStackData = {
	skinName: 'string',
	skinId: 'uint32',
	bitfield: 'uint8',
	id: 'uint32',
};
const Buff = {
	slot: 'uint8',
	count: 'int32',
};

const MovementDataType = {
	None: 0,
	WithSpeed: 1,
	Normal: 2,
	Stop: 3,
};


export default class OnEnterVisibilityClient extends BasePacket {
	writer(buffer) {
		super.writer(buffer);

		buffer.write('uint16', this.packet?.length || 0);
		if (this.packet?.length)
			buffer.write([Packet, this.packet.length], this.packet);

		buffer.write('uint8', this.itemData?.length || 0);
		if (this.itemData?.length)
			buffer.write([ItemData, this.itemData.length], this.itemData);

		if (this.isTurret)//is inhib or nexus
			return;

		buffer.write('uint8', !!this.shieldValues);
		if (this.shieldValues)
			buffer.write(ShieldValues, this.shieldValues);

		buffer.write('int32', this.characterStackData?.length || 0);
		if (this.characterStackData?.length)
			buffer.write([CharacterStackData, this.characterStackData.length], this.characterStackData);

		buffer.write({
			lookAtNetId: 'uint32',
			lookAtType: 'uint8',
			lookAtPosition: SVector3,
		}, this);

		buffer.write('int32', this.Buff?.length || 0);
		if (this.Buff?.length)
			buffer.write([Buff, this.Buff.length], this.Buff);

		buffer.write('uint8', this.unknownIsHero || 0);

		if (this.movementData) {

			this.movementData.type = this.movementData.waypoints ? (
				this.movementData.speedParams ? MovementDataType.WithSpeed : MovementDataType.Normal
			) : MovementDataType.Stop;

			this.movementData.syncId = this.movementData.syncId || performance.now();

			buffer.write({
				type: 'uint8',
				syncId: 'int32',
			}, this.movementData);

			if (this.movementData.type == MovementDataType.WithSpeed) {
				CMovementDataWithSpeed.writer(buffer, this.movementData);
			}
			else if (this.movementData.type == MovementDataType.Normal) {
				CMovementDataNormal.writer(buffer, this.movementData);
			}
			else if (this.movementData.type == MovementDataType.Stop) {
				buffer.write({
					position: SVector2,
					forward: SVector2,
				}, this.movementData);
			}
		}
	}
	reader(buffer) {
		super.reader(buffer);

		let packet_length = buffer.read('uint16');
		if (packet_length)
			this.packet = buffer.read(['uint8', packet_length]);//Packet

		let itemData_length = buffer.read('uint8', this.itemData?.length || 0);
		if (itemData_length)
			this.itemData = buffer.read([ItemData, itemData_length]);

		this.isTurret = buffer.offset == buffer.length;
		if (this.isTurret)
			return;

		this.shieldValues = buffer.read('uint8');//!!
		if (this.shieldValues)
			this.shieldValues = buffer.read(ShieldValues);

		let characterStackData_length = buffer.read('int32');
		if (characterStackData_length)
			this.characterStackData = buffer.read([CharacterStackData, characterStackData_length]);

		Object.assign(this, buffer.read({
			lookAtNetId: 'uint32',
			lookAtType: 'uint8',
			lookAtPosition: SVector3,
		}));

		let buff_length = buffer.read('int32');
		if (buff_length)
			this.Buff = buffer.read([Buff, buff_length]);

		this.unknownIsHero = buffer.read('uint8');

		this.movementData = buffer.offset == buffer.length ? false : {};
		if (this.movementData) {

			Object.assign(this.movementData, buffer.read({
				type: 'uint8',
				syncId: 'int32',
			}));

			if (this.movementData.type == MovementDataType.WithSpeed) {
				CMovementDataWithSpeed.reader(buffer, this);
			}
			else if (this.movementData.type == MovementDataType.Normal) {
				CMovementDataNormal.reader(buffer, this);
			}
			else if (this.movementData.type == MovementDataType.Stop) {
				Object.assign(this.movementData, buffer.read({
					position: SVector2,
					forward: SVector2,
				}));
			}
		}
	}
}
