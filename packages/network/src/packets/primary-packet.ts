
import RelativeDataView from '../relative-data-view';
import Packet, { PacketModel } from './packet';


export type PrimaryPacketModel = PacketModel & {
	cmd?: number;
};

export default class PrimaryPacket extends Packet {

	static reader(dvr: RelativeDataView, payload: PrimaryPacketModel) {
		super.reader(dvr, payload);
		payload.cmd = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: PrimaryPacketModel) {
		super.writer(dvr, payload);
		dvr.writeUint8(payload.cmd || this.id);
	}

}
