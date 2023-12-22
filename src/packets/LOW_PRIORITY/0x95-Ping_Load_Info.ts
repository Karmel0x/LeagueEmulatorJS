import BasePacket from '../BasePacket';
import SConnectionInfo from '../sharedstruct/SConnectionInfo';


export default class Ping_Load_Info extends BasePacket {
	static struct = SConnectionInfo;
}
