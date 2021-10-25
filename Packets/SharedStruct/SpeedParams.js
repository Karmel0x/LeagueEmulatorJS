const Vector2 = require('./Vector2');

module.exports = {//SpeedParams
	PathSpeedOverride: 'float',
	ParabolicGravity: 'float',
	ParabolicStartPoint: Vector2,
	Facing: 'uint8',
	FollowNetID: 'uint32',
	FollowDistance: 'float',
	FollowBackDistance: 'float',
	FollowTravelTime: 'float',
};
