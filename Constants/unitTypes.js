
const unitTypes = {
	Unit: 0,
	Player: 1,
	Minion: 2,
	Turret: 3,
	Inhibitor: 4,
	Nexus: 5,
};

unitTypes.ALL = unitTypes.Unit | unitTypes.Player | unitTypes.Minion | unitTypes.Turret | unitTypes.Inhibitor | unitTypes.Nexus;


module.exports = unitTypes;
