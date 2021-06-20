
module.exports = {//S2C_TURRET_SPAWN
	cmd: 'uint8',
	netId: 'uint32',

	NetID: 'uint32',
	NetNodeID: 'uint8',
	Name: ['char', 64],//utf-8?
	IsTargetable: 'uint8',
	IsTargetableToTeamSpellFlags: 'uint32',
};
