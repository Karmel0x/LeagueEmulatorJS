var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		TeamID: 'uint32',
		RegionType: 'int32',
		ClientID: 'int32',
		UnitNetID: 'uint32',
		BubbleNetID: 'uint32',
		VisionTargetNetID: 'uint32',
		Position: Vector2,
		TimeToLive: 'float',
		ColisionRadius: 'float',
		GrassRadius: 'float',
		SizeMultiplier: 'float',
		SizeAdditive: 'float',
		flags: 'uint8',
        //this.HasCollision = (flags & 1) != 0;
        //this.GrantVision = (flags & 2) != 0;
        //this.RevealStealth = (flags & 4) != 0;
		BaseRadius: 'float',
	}
};
