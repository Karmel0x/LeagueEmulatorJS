
import fs from 'fs';
import RelativeDataView from '@repo/network/relative-data-view';
import { ReplayFileReader, ReplayRecord } from './replay-reader';


const reader_lrpkt: ReplayFileReader = function (filePath) {
    let f = fs.readFileSync(filePath);
    let dvr = RelativeDataView.from(f);

    let header = ({
        magic: dvr.readUint8Array(4),
        size: dvr.readUint32(),
        pad: dvr.readUint8Array(8),
    });

    dvr.readUint8Array(header.size);

    let readPacketChunk = () => {
        let packet = {
            size: dvr.readUint32(),
            time: dvr.readFloat(),
            channel: dvr.readUint8(),
            reserved: dvr.readUint8Array(3),
        };

        let data = dvr.readUint8Array(packet.size);

        return {
            time: packet.time,
            data: data.buffer,
            channel: packet.channel,
            flags: packet.reserved,
        } as ReplayRecord;
    };

    let packets: ReturnType<typeof reader_lrpkt> = [];

    while (dvr.offset < f.length) {
        if (dvr.readUint8() == 'p'.charCodeAt(0))
            if (dvr.readUint8() == 'k'.charCodeAt(0))
                if (dvr.readUint8() == 't'.charCodeAt(0))
                    if (dvr.readUint8() == 0x00) {
                        let packet = readPacketChunk();
                        packets.push(packet);
                    }
    }

    return packets;
}

export default reader_lrpkt;
