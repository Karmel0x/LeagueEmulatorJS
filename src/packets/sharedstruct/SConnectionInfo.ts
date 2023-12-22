
import config from '../../constants/config.json' assert { type: "json" };


let SConnectionInfo = {
	clientId: 'int32',
	playerId: 'int64',
	percentage: 'float',
	ETA: 'float',
	count: 'uint16',
	ping: 'uint16',
};

if (config.Version >= 4.18) {
	SConnectionInfo.bitfield = ['bitfield', {
		ready: 1,
	}];
}

export default SConnectionInfo;
