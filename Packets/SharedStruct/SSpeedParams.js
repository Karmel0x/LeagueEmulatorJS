
const SVector2 = require('./SVector2');


module.exports = {//SSpeedParams
	pathSpeedOverride: 'float',
	parabolicGravity: 'float',
	parabolicStartPoint: SVector2,
	facing: 'bool',
	followNetId: 'uint32',
	followDistance: 'float',
	followBackDistance: 'float',
	followTravelTime: 'float',
};
