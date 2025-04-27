
import RelativeDataView from '@repo/network/relative-data-view';
import fs from 'fs';
import { ReplayFileReader, ReplayRecord } from './replay-reader';


const reader_lrpkt: ReplayFileReader = function (filePath) {
    const f = fs.readFileSync(filePath);
    const dvr = RelativeDataView.fromBuffer(f);

    const header = ({
        magic: dvr.readUint8Array(4),
        size: dvr.readUint32(),
        pad: dvr.readUint8Array(8),
    });

    dvr.readUint8Array(header.size);

    const readPacketChunk = () => {
        const packet = {
            size: dvr.readUint32(),
            time: dvr.readFloat(),
            channel: dvr.readUint8(),
            reserved: dvr.readUint8Array(3),
        };

        const data = dvr.readUint8Array(packet.size);

        return {
            time: packet.time,
            data: data.buffer,
            channel: packet.channel,
            flags: packet.reserved,
        } as ReplayRecord;
    };

    const packets: ReturnType<typeof reader_lrpkt> = [];

    while (dvr.offset < f.length) {
        if (dvr.readUint8() === 'p'.charCodeAt(0))
            if (dvr.readUint8() === 'k'.charCodeAt(0))
                if (dvr.readUint8() === 't'.charCodeAt(0))
                    if (dvr.readUint8() === 0x00) {
                        const packet = readPacketChunk();
                        packets.push(packet);
                    }
    }

    return packets;
};

export default reader_lrpkt;
