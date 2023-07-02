const BasePacket = require('../BasePacket');
const SVector2 = require('../sharedstruct/SVector2');
const SVector3 = require('../sharedstruct/SVector3');

const CMovementDataNormal = require('../sharedstruct/CMovementDataNormal');
const CMovementDataWithSpeed = require('../sharedstruct/CMovementDataWithSpeed');

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


module.exports = class OnEnterVisibilityClient extends BasePacket {
	writer(buffer) {
		super.writer(buffer);

		buffer.write1('uint16', this.packet?.length || 0);
		if (this.packet?.length)
			buffer.writeobj([Packet, this.packet.length], this.packet);

		buffer.write1('uint8', this.itemData?.length || 0);
		if (this.itemData?.length)
			buffer.writeobj([ItemData, this.itemData.length], this.itemData);

		if (this.isTurret)//is inhib or nexus
			return;

		buffer.write1('uint8', !!this.shieldValues);
		if (this.shieldValues)
			buffer.writeobj(ShieldValues, this.shieldValues);

		buffer.write1('int32', this.characterStackData?.length || 0);
		if (this.characterStackData?.length)
			buffer.writeobj([CharacterStackData, this.characterStackData.length], this.characterStackData);

		buffer.writeobj({
			lookAtNetId: 'uint32',
			lookAtType: 'uint8',
			lookAtPosition: SVector3,
		}, this);

		buffer.write1('int32', this.Buff?.length || 0);
		if (this.Buff?.length)
			buffer.writeobj([Buff, this.Buff.length], this.Buff);

		buffer.write1('uint8', this.unknownIsHero || 0);

		if (this.movementData) {

			this.movementData.type = this.movementData.waypoints ? (
				this.movementData.speedParams ? MovementDataType.WithSpeed : MovementDataType.Normal
			) : MovementDataType.Stop;

			this.movementData.syncId = this.movementData.syncId || performance.now();

			buffer.writeobj({
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
				buffer.writeobj({
					position: SVector2,
					forward: SVector2,
				}, this.movementData);
			}
		}
	}
	reader(buffer) {
		super.reader(buffer);

		let packet_length = buffer.read1('uint16');
		if (packet_length)
			this.packet = buffer.readobj(['uint8', packet_length]);//Packet

		let itemData_length = buffer.read1('uint8', this.itemData?.length || 0);
		if (itemData_length)
			this.itemData = buffer.readobj([ItemData, itemData_length]);

		this.isTurret = buffer.off == buffer.length;
		if (this.isTurret)
			return;

		this.shieldValues = buffer.read1('uint8');//!!
		if (this.shieldValues)
			this.shieldValues = buffer.readobj(ShieldValues);

		let characterStackData_length = buffer.read1('int32');
		if (characterStackData_length)
			this.characterStackData = buffer.readobj([CharacterStackData, characterStackData_length]);

		Object.assign(this, buffer.readobj({
			lookAtNetId: 'uint32',
			lookAtType: 'uint8',
			lookAtPosition: SVector3,
		}));

		let buff_length = buffer.read1('int32');
		if (buff_length)
			this.Buff = buffer.readobj([Buff, buff_length]);

		this.unknownIsHero = buffer.read1('uint8');

		this.movementData = buffer.off == buffer.length ? false : {};
		if (this.movementData) {

			Object.assign(this.movementData, buffer.readobj({
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
				Object.assign(this.movementData, buffer.readobj({
					position: SVector2,
					forward: SVector2,
				}));
			}
		}
	}
};
