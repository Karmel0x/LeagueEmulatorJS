import BasePacket from '../BasePacket';


export default class TeamSurrenderStatus extends BasePacket {
	static struct = {
		surrenderReason: 'uint32',
		forVote: 'uint8',
		againstVote: 'uint8',
		team: 'uint32',
	};
}
