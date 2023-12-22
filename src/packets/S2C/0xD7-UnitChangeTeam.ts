import BasePacket from '../BasePacket';

export default class UnitChangeTeam extends BasePacket {
	static struct = {
		unitNetId: 'uint32',
		team: 'uint32',
	};
}
