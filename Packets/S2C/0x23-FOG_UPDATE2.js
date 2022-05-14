var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		TeamID: 'uint32',
		RegionType: 'int32',
		ClientID: 'int32',
		UnitNetId: 'uint32',
		BubbleNetId: 'uint32',
		VisionTargetNetId: 'uint32',
		Position: Vector2,
		TimeToLive: 'float',
		ColisionRadius: 'float',
		GrassRadius: 'float',
		SizeMultiplier: 'float',
		SizeAdditive: 'float',
		flags: ['bitfield', {
			HasCollision: 1,
			GrantVision: 2,
			RevealStealth: 4,
		}],
		BaseRadius: 'float',
	}
};
