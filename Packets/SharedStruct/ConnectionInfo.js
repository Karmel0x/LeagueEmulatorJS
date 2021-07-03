const config = require('../../Constants/config.json');

var ConnectionInfo = {
	ClientID: 'int32',
	PlayerID: 'int64',
	Percentage: 'float',
	ETA: 'float',
	Count: 'uint16',
	Ping: 'uint16',
};

if(config.Version >= 4.18){
    ConnectionInfo.bitfield = ['bitfield', {
		Ready: 1,
	}];
}

module.exports = ConnectionInfo;
