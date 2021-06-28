module.exports = {//HANDSHAKE.KEY_CHECK
	cmd: 'uint8',
	partialKey: ['uint8', 3],

	ClientID: 'uint32',
	PlayerID: 'uint64',
	VersionNumber: 'uint32',
	CheckSum: 'uint64',
	dummy1: 'uint32',
};
