var Talent = {
	Hash: 'uint32',
	Level: 'uint8',
};

module.exports = {//S2C.AVATAR_INFO
	cmd: 'uint8',
	netId: 'uint32',

	ItemIDs: ['uint32', 30],
	SummonerIDs: ['uint32', 2],
	SummonerIDs2: ['uint32', 2],
	Talents: [Talent, 80],
	Level: 'uint8',
	WardSkin: 'uint8',
};
