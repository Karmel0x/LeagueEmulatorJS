
const teamIds = {
	UNKNOWN: 0,
	BLUE: 100,//ORDER
	RED: 200,//CHAOS
	NEUTRAL: 300,
	MAX: 400,
};

teamIds.ALL = teamIds.UNKNOWN | teamIds.BLUE | teamIds.RED | teamIds.NEUTRAL;


module.exports = teamIds;
