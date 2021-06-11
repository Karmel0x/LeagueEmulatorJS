var Vector3 = require('./SharedStruct/Vector3');

var ItemData = {
	Slot: 'uint8',
	ItemsInSlot: 'uint8',
	SpellCharges: 'uint8',
	ItemID: 'uint32',
};
var ShieldValues = {
	Magical: 'float',
	Phyisical: 'float',
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
var MovementDataWithHeader = {
	type: 'uint8',
	movementSyncID: 'int32',
};


var Packet = {
	size: 'uint16',
	data: ['uint8', 'size'],
};


/*function S2C_OBJECT_SPAWN(buffer, source){
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
}*/

module.exports = {//S2C_OBJECT_SPAWN
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
};
