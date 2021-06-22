module.exports = {//LOADING_SCREEN.LOAD_SCREEN_INFO
	cmd: 'uint8',
	//netId: 'uint32',

	blueMax: 'uint32',
	redMax: 'uint32',
	teamBlue_playerIds: ['int64', 24],
	//dummy1: ['char', 144],
	teamRed_playerIds: ['int64', 24],
	//dummy2: ['char', 144],
	currentBlue: 'uint32',
	currentRed: 'uint32',
};
