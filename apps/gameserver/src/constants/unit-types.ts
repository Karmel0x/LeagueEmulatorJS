
const unitTypes = {
	Unit: 0,
	Player: 1,
	Minion: 2,
	Turret: 3,
	Inhibitor: 4,
	Nexus: 5,
	ALL: -1,
};

//enum UnitType_e {
//	MINION_UNIT = 0x0,
//	HERO_UNIT = 0x1,
//	TURRET_UNIT = 0x2,
//	INHIBITOR_UNIT = 0x3,
//	HQ_UNIT = 0x4,
//	UNKNOWN_UNIT = 0x5,
//};


unitTypes.ALL = unitTypes.Unit | unitTypes.Player | unitTypes.Minion | unitTypes.Turret | unitTypes.Inhibitor | unitTypes.Nexus;


export default unitTypes;
