var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');
var Vector3 = require('../SharedStruct/Vector3');

const MovementDataNormal = require('../SharedStruct/MovementDataNormal');
const MovementDataWithSpeed = require('../SharedStruct/MovementDataWithSpeed');

var Packet = {
	size: 'uint16',
	data: ['uint8', 'size'],
};
var ItemData = {
	Slot: 'uint8',
	ItemsInSlot: 'uint8',
	SpellCharges: 'uint8',
	ItemID: 'uint32',
};
var ShieldValues = {
	Magical: 'float',
	Physical: 'float',
	MagicalAndPhysical: 'float',
};
var CharacterStackData = {
	SkinName: 'string',
	SkinID: 'uint32',
	bitfield: 'uint8',
	ID: 'uint32',
};
var Buff = {
	slot: 'uint8',
	count: 'int32',
};

const MovementDataType = {
	None: 0,
	WithSpeed: 1,
	Normal: 2,
	Stop: 3,
};


module.exports = class extends BasePacket {//S2C.OBJECT_SPAWN
	writer(buffer){
		super.writer(buffer);

		buffer.write1('uint16', this.Packet?.length || 0);
		if(this.Packet?.length)
			buffer.writeobj([Packet, this.Packet.length], this.Packet);
			
		buffer.write1('uint8', this.ItemData?.length || 0);
		if(this.ItemData?.length)
			buffer.writeobj([ItemData, this.ItemData.length], this.ItemData);

		if(this.isTurret)//is inhib or nexus
			return;

		buffer.write1('uint8', !!this.ShieldValues);
		if(this.ShieldValues)
			buffer.writeobj(ShieldValues, this.ShieldValues);

		buffer.write1('int32', this.CharacterStackData?.length || 0);
		if(this.CharacterStackData?.length)
			buffer.writeobj([CharacterStackData, this.CharacterStackData.length], this.CharacterStackData);

		buffer.writeobj({
			LookAtNetID: 'uint32',
			LookAtType: 'uint8',
			LookAtPosition: Vector3,
		}, this);

		buffer.write1('int32', this.Buff?.length || 0);
		if(this.Buff?.length)
			buffer.writeobj([Buff, this.Buff.length], this.Buff);

		buffer.write1('uint8', this.UnknownIsHero || 0);

		if(this.MovementData){
			
			this.MovementData.type = this.MovementData.Waypoints ? (
					this.MovementData.SpeedParams ? MovementDataType.WithSpeed : MovementDataType.Normal
				) : MovementDataType.Stop;

        	this.MovementData.SyncID = this.MovementData.SyncID || performance.now();

			buffer.writeobj({
				type: 'uint8',
				SyncID: 'int32',
			}, this.MovementData);
			
			if(this.MovementData.type == MovementDataType.WithSpeed){
				MovementDataWithSpeed.writer(buffer, this.MovementData);
			}
			else if(this.MovementData.type == MovementDataType.Normal){
				MovementDataNormal.writer(buffer, this.MovementData);
			}
			else if(this.MovementData.type == MovementDataType.Stop){
				buffer.writeobj({
					Position: Vector2,
					Forward: Vector2,
				}, this.MovementData);
			}
		}
	}
	reader(buffer){
		super.reader(buffer);
		
		var Packet_length = buffer.read1('uint16');
		if(Packet_length)
			this.Packet = buffer.readobj(['uint8', Packet_length]);//Packet
			
		var ItemData_length = buffer.read1('uint8', this.ItemData?.length || 0);
		if(ItemData_length)
			this.ItemData = buffer.readobj([ItemData, ItemData_length]);

		this.isTurret = buffer.off == buffer.length;
		if(this.isTurret)
			return;

		this.ShieldValues = buffer.read1('uint8');//!!
		if(this.ShieldValues)
			this.ShieldValues = buffer.readobj(ShieldValues);

		var CharacterStackData_length = buffer.read1('int32');
		if(CharacterStackData_length)
			this.CharacterStackData = buffer.readobj([CharacterStackData, CharacterStackData_length]);

		Object.assign(this, buffer.readobj({
			LookAtNetID: 'uint32',
			LookAtType: 'uint8',
			LookAtPosition: Vector3,
		}));

		var Buff_length = buffer.read1('int32');
		if(Buff_length)
			this.Buff = buffer.readobj([Buff, Buff_length]);

		this.UnknownIsHero = buffer.read1('uint8');

		this.MovementData = buffer.off == buffer.length ? false : {};
		if(this.MovementData){

			Object.assign(this.MovementData, buffer.readobj({
				type: 'uint8',
				SyncID: 'int32',
			}));
			
			if(this.MovementData.type == MovementDataType.WithSpeed){
				MovementDataWithSpeed.reader(buffer, this);
			}
			else if(this.MovementData.type == MovementDataType.Normal){
				MovementDataNormal.reader(buffer, this);
			}
			else if(this.MovementData.type == MovementDataType.Stop){
				Object.assign(this.MovementData, buffer.readobj({
					Position: Vector2,
					Forward: Vector2,
				}));
			}
		}
	}
};
