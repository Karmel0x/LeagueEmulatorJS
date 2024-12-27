
enum loadingStages {
	notConnected = 0,
	loading = 1,
	loaded = 2,
	inGame = 3,
};

export default loadingStages;

export enum GameState {
	pregame = 0x0,
	spawn = 0x1,
	gameloop = 0x2,
	endgame = 0x3,
	preExit = 0x4,
	exit = 0x5,
};

