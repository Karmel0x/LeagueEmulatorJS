
import type RelativeDataView from '../relative-data-view';
//import Packet, { PacketDebugger } from './packet';


export default class PartialPacket {

    static read(dvr: RelativeDataView) {
        let payload = {};

        //if (Packet.debug)
        //    payload = PacketDebugger.getProxy(dvr, payload, false);

        this.reader(dvr, payload);
        return payload;
    }

    /**
     * @abstract
     */
    static reader(dvr: RelativeDataView, payload: {}) {

    }

    /**
     * @abstract
     */
    static writer(dvr: RelativeDataView, payload: {}) {

    }

}
