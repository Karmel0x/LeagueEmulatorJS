import BasePacket from '../BasePacket.js';
import SConnectionInfo from '../sharedstruct/SConnectionInfo.js';


export default class Ping_Load_Info extends BasePacket {
	static struct = SConnectionInfo;
}
