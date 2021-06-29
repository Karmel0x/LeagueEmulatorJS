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
    ConnectionInfo.bitfield = 'uint8';
    //this.Ready = (bitfield & 0x01) != 0
}

module.exports = ConnectionInfo;
