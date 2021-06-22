
var Data = {
	masterMask: 'uint8',
	netId: 'uint32',

    Data2: 'uint8'
};

var Unit = {
	masterMask: 'uint8',
	netId: 'uint32',

    Data: [Data, 6],
};

module.exports = {//S2C.CHAR_STATS//todo
	cmd: 'uint8',
	netId: 'uint32',

	syncID: 'int32',
	unit_length: 'uint8',
    Unit: [Unit, 'unit_length'],
};
