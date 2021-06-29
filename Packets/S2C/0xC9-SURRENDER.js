var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
        //this.VoteYes = (bitfield & 1) != 0;
        //this.OpenVoteMenu = (bitfield & 2) != 0;
		PlayerNetID: 'uint32',
		ForVote: 'uint8',
		AgainstVote: 'uint8',
		NumPlayers: 'uint8',
		TeamID: 'uint32',
		TimeOut: 'float',
	}
};
