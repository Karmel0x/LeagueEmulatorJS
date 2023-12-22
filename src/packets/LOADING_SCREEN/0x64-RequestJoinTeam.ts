import PrimaryPacket from '../PrimaryPacket';

export default class RequestJoinTeam extends PrimaryPacket {
	static struct = {
		clientId: 'int32',
		team: 'uint32',
	};
}
