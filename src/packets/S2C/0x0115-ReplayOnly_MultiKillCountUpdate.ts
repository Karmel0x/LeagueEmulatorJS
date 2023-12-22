import ExtendedPacket from '../ExtendedPacket';


export default class ReplayOnly_MultiKillCountUpdate extends ExtendedPacket {
	static struct = {
		ownerNetId: 'uint32',
		multiKillCount: 'uint8',
	};
}
