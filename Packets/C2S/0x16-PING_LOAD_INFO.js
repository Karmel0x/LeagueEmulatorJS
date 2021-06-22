module.exports = {//C2S.PING_LOAD_INFO
	cmd: 'uint8',
	netId: 'uint32',

	ClientID: 'int32',
	PlayerID: 'int64',
	Percentage: 'float',
	ETA: 'float',
	Count: 'uint16',
	Ping: 'uint16',
	Ready_bitField: 'uint8',//(bitfield & 0x01) != 0
};
