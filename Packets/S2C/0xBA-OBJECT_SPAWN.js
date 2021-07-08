var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');
var Vector3 = require('../SharedStruct/Vector3');


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
/*var MovementDataNormal = {
	OrderType: 'uint8',
	Position: Vector2,
	TargetNetID: 'uint32',
};
var MovementDataStop = {
	OrderType: 'uint8',
	Position: Vector2,
	Forward: Vector2,
};
var MovementDataWithHeader = {
	type: 'uint8',
	SyncID: 'int32',
	MovementData: MovementDataStop,
};*/




/*function OBJECT_SPAWN(buffer, source){
	var buffer2 = Buffer.allocUnsafe(1000);
	buffer2.write1('uint16', source.totalSize);
	for(;source.totalSize > 0;){
		buffer2.write1('uint16', source.size);
		buffer2.write1(['uint8', source.size], source.data);
		source.totalSize -= 2;
		source.totalSize -= source.size;
	}
	
	buffer2.write1('uint8', source.ItemData.length);
	buffer2.writeobj([ItemData, source.ItemData.length], source.ItemData);
	
	var hasShield = false;
	for(let i in source.ShieldValues)
		if(source.ShieldValues[i]){
			hasShield = true;
			break;
		}

	buffer2.write1('uint8', hasShield);
	buffer2.writeobj([ShieldValues, hasShield], source.ShieldValues);

	buffer2.write1('int32', source.CharacterStackData.length);
	buffer2.writeobj([CharacterStackData, source.CharacterStackData.length], source.CharacterStackData);

	buffer2.write1('uint32', source.LookAtNetID);
	buffer2.write1('uint8', source.LookAtType);
	buffer2.writeobj(Vector3, source.LookAtPosition);
	
	buffer2.write1('int32', source.Buff.length);
	buffer2.writeobj([Buff, source.buff.length], source.Buff);
	
	buffer2.write1('uint8', source.UnknownIsHero);

	buffer2.writeobj([MovementDataWithHeader, !!source.MovementData], source.MovementData);
	
	buffer = Buffer.concat([buffer, buffer2], buffer.size + buffer2.off);
}* /

module.exports = {//OBJECT_SPAWN
	cmd: 'uint8',
	netId: 'uint32',

	Packet_length: 'uint16',
	Packet: [Packet, 'Packet_length'],
	ItemData_length: 'uint8',
	ItemData: [ItemData, 'ItemData_length'],
	ShieldValues_bool: 'uint8',
	ShieldValues: [ShieldValues, 'ShieldValues_bool'],
	CharacterStackData_length: 'int32',
	CharacterStackData: [CharacterStackData, 'CharacterStackData_length'],
	LookAtNetID: 'uint32',
	LookAtType: 'uint8',
	LookAtPosition: Vector3,
	Buff_length: 'int32',
	Buff: [Buff, 'Buff_length'],
	UnknownIsHero: 'uint8',
	MovementDataWithHeader: [MovementDataWithHeader, 'MovementDataWithHeader_bool'],
};*/

var CompressedWaypoint = require('../SharedStruct/CompressedWaypoint');

const MovementDataType = {
	None: 0,
	WithSpeed: 1,
	Normal: 2,
	Stop: 3,
};

var SpeedParams = {
	PathSpeedOverride: 'float',
	ParabolicGravity: 'float',
	ParabolicStartPoint: Vector2,
	Facing: 'uint8',
	FollowNetID: 'uint32',
	FollowDistance: 'float',
	FollowBackDistance: 'float',
	FollowTravelTime: 'float',
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

			if(!this.MovementData.SyncID)
				this.MovementData.SyncID = performance.now();

			buffer.writeobj({
				type: 'uint8',
				SyncID: 'int32',
			}, this.MovementData);
			
			if(this.MovementData.type == MovementDataType.WithSpeed){

				this.MovementData.bitfield1 = 0;
				if(this.MovementData.Waypoints && this.MovementData.Waypoints.length)
					this.MovementData.bitfield1 = this.MovementData.Waypoints.length << 1;
				if(this.TeleportID)
					this.MovementData.bitfield1 |= 1;

				buffer.write1('uint8', this.MovementData.bitfield);
				if(this.MovementData.Waypoints && this.MovementData.Waypoints.length){
					buffer.write1('uint32', this.MovementData.TeleportNetID);
					if(this.TeleportID)
						buffer.write1('uint8', this.MovementData.TeleportID);
					buffer.writeobj(SpeedParams, this.MovementData.SpeedParams);

					CompressedWaypoint.writer(buffer, this.MovementData.Waypoints);
				}
				
			}
			else if(this.MovementData.type == MovementDataType.Normal){
				this.MovementData.bitfield1 = 0;
				if(this.MovementData.Waypoints && this.MovementData.Waypoints.length)
					this.MovementData.bitfield1 = this.MovementData.Waypoints.length << 1;
				if(this.TeleportID)
					this.MovementData.bitfield1 |= 1;

				buffer.write1('uint8', this.MovementData.bitfield);
				if(this.MovementData.Waypoints && this.MovementData.Waypoints.length){
					buffer.write1('uint32', this.MovementData.TeleportNetID);
					if(this.TeleportID)
						buffer.write1('uint8', this.MovementData.TeleportID);

					CompressedWaypoint.writer(buffer, this.MovementData.Waypoints);
				}
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
			this.Packet = buffer.readobj([Packet, Packet_length]);
			
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
				this.MovementData.bitfield = buffer.read1('uint8');
				var Waypoints_length = this.MovementData.bitfield >> 1;
				if(Waypoints_length){
					this.MovementData.TeleportNetID = buffer.read1('uint32');
					if((this.MovementData.bitfield & 1) != 0)
						this.MovementData.TeleportID = buffer.read1('uint8');
					this.MovementData.SpeedParams = buffer.readobj(SpeedParams);

					CompressedWaypoint.reader(buffer, Waypoints_length);
				}
			}
			else if(this.MovementData.type == MovementDataType.Normal){
				this.MovementData.bitfield = buffer.read1('uint8');
				var Waypoints_length = this.MovementData.bitfield >> 1;
				if(Waypoints_length){
					this.MovementData.TeleportNetID = buffer.read1('uint32');
					if((this.MovementData.bitfield & 1) != 0)
						this.MovementData.TeleportID = buffer.read1('uint8');

					CompressedWaypoint.reader(buffer, Waypoints_length);
				}
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
