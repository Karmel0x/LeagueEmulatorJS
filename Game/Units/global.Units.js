
//const unitTypes = require('../../Constants/unitTypes');
//const teamIds = require('../../Constants/teamIds');


global.lastNetId = global.lastNetId || 0x40000000;
global.lastUnitId = global.lastUnitId || 0;
global.unitCount = global.unitCount || 0;
global.units = global.units || [];
global.unitsNetId = global.unitsNetId || {};
global.destroyedUnits = global.destroyedUnits || [];


var unitsCache = {};
var unitsCache_lastUnitId = 0;

// get units by team and type, TODO: make caching more advanced
global.getUnits = function(team = 'ALL', type = 'ALL'){
	if(team == 'ALL' && type == 'ALL')
		return global.units;

	var key = team + '_' + type;
	if(!unitsCache[key] || global.lastUnitId !== unitsCache_lastUnitId){
		unitsCache[key] = global.units.filter(unit => {
			// would be better to use bitwise but teamIds and unitTypes enums are not bitwise
			return (unit.info.team === team || team === 'ALL') && (unit.info.type === type || type === 'ALL');
		});
	}
	return unitsCache[key];
};
global.getUnitCount = function(team = 'ALL', type = 'ALL'){
	var units = global.getUnits(team, type);
	return units.length;
};

global.getUnitsF = function(team = 'ALL', type = 'ALL'){
	return global.getUnits(team, type);
};

global.getUnitByNetId = function(netId){
	return global.unitsNetId[netId];
};


function appendGlobal(unit){
	unit.id = global.lastUnitId++;
	++global.unitCount;

	global.units.push(unit);
	global.unitsNetId[unit.netId] = unit;
}
function removeGlobal(unit){
	--global.unitCount;

	var index = global.units.indexOf(unit);
	if(index !== -1)
		global.units.splice(index, 1);

	global.destroyedUnits.push(unit);

}

module.exports = { appendGlobal, removeGlobal };
