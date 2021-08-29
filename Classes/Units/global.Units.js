
global.lastNetId = global.lastNetId || 0x40000000;

const UnitTypes = {
	ALL: -1,
	Unit: 0,
	Player: 1,
	Minion: 2,
	Turret: 3,
	Inhibitor: 4,
	Nexus: 5,
};

const TEAMs = {
	ALL: -1,
	UNKNOWN: 0,
	BLUE: 100,//ORDER
	RED: 200,//CHAOS
	NEUTRAL: 300,
	MAX: 400,
};

global.UnitsNetId = global.UnitsNetId || {};
global.UnitsCount = global.UnitsCount || {count: 0};
for(let team in TEAMs){
	global.UnitsCount[team] = global.UnitsCount[team] || {count: 0};
	for(let unit in UnitTypes){
		global.UnitsCount[team][unit] = global.UnitsCount[team][unit] || {count: 0};
	}
}

global.Units = global.Units || {};
for(let team in TEAMs){
	global.Units[team] = global.Units[team] || {};
	for(let unit in UnitTypes){
		global.Units[team][unit] = global.Units[team][unit] || {};
	}
}

global.UnitsTyped = global.UnitsTyped || {};
for(let unit in UnitTypes){
	global.UnitsTyped[unit] = global.UnitsTyped[unit] || {};
	for(let team in TEAMs){
		global.UnitsTyped[unit][team] = global.UnitsTyped[unit][team] || {};
	}
}


function appendGlobal(unit){
	unit.id = global.UnitsCount.count;
	++global.UnitsCount.count;
	++global.UnitsCount[unit.info.team].count;
	++global.UnitsCount[unit.info.team][unit.info.type].count;

	global.Units[unit.info.team][unit.info.type][unit.id] = unit;
	global.Units[unit.info.team]['ALL'][unit.id] = unit;
	global.Units['ALL'][unit.info.type][unit.id] = unit;
	global.Units['ALL']['ALL'][unit.id] = unit;

	global.UnitsNetId[unit.netId] = unit;
	global.UnitsTyped[unit.info.type][unit.info.team][unit.info.num] = unit;
}

module.exports = { appendGlobal };
