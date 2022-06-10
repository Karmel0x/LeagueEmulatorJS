const BasePacket = require('../BasePacket');
var SVector2 = require('../SharedStruct/SVector2');


module.exports = class AddRegion extends BasePacket {
	static struct = {
		teamId: 'uint32',
		regionType: 'int32',
		clientId: 'int32',
		unitNetId: 'uint32',
		bubbleNetId: 'uint32',
		visionTargetNetId: 'uint32',
		position: SVector2,
		timeToLive: 'float',
		colisionRadius: 'float',
		grassRadius: 'float',
		sizeMultiplier: 'float',
		sizeAdditive: 'float',
		flags: ['bitfield', {
			hasCollision: 1,
			grantVision: 2,
			revealStealth: 4,
		}],
		baseRadius: 'float',
	}
};
