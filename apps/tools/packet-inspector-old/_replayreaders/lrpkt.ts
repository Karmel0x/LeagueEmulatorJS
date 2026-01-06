
import RelativeDataView from '@repo/network/relative-data-view';
import fs from 'fs';
import type { ReplayFileReader, ReplayRecord } from './replay-reader';

export type LrpktInfo = {
    header?: any;
    packets: ReplayRecord[];
};

export type LrpktChunk = {
    type: null;
} | {
    type: 'nfo';
    header: any;
} | {
    type: 'pkt';
    packet: ReplayRecord;
};

function readChunk(dvr: RelativeDataView): LrpktChunk | undefined {
    if (dvr.offset + 4 > dvr.buffer.byteLength)
        return;

    const marker = dvr.readCharArray(4);

    if (marker === 'nfo') {
        const headerSize = dvr.readUint32();
        dvr.readUint8Array(8); // padding
        const headerData = dvr.readCharArray(headerSize);

        // 16-byte alignment padding for header data
        const remain = headerSize % 16;
        if (remain !== 0) {
            const paddingSize = 16 - remain;
            dvr.readUint8Array(paddingSize);
        }

        return { type: 'nfo', header: headerData };
    }

    if (marker === 'pkt') {
        const packet = {
            size: dvr.readUint32(),
            time: dvr.readFloat(),
            channel: dvr.readUint8(),
            direction: dvr.readUint8(),
            peersMask: dvr.readUint16(),
        };

        const data = dvr.readUint8Array(packet.size);

        // 16-byte alignment padding for packet data
        const remain = packet.size % 16;
        if (remain !== 0) {
            const paddingSize = 16 - remain;
            dvr.readUint8Array(paddingSize);
        }

        // Unpack peers bitmask (each bit represents peer 0-15)
        const peerNums: number[] = [];
        for (let i = 0; i < 16; i++) {
            if (packet.peersMask & (1 << i)) {
                peerNums.push(i);
            }
        }

        return {
            type: 'pkt',
            packet: {
                time: packet.time,
                data: data.buffer,
                channel: packet.channel,
                direction: packet.direction === 1 ? 'sent' : 'recv',
                peerNums: peerNums,
            } as ReplayRecord
        };
    }

    return { type: null };
}

const reader_lrpkt: ReplayFileReader = (filePath: string) => {
    const f = fs.readFileSync(filePath);
    const dvr = RelativeDataView.fromBuffer(f);

    let info: any = undefined;
    const packets: ReplayRecord[] = [];

    while (dvr.offset < f.byteLength) {
        const chunk = readChunk(dvr);
        if (!chunk)
            break;

        if (chunk.type === 'nfo' && chunk.header !== undefined) {
            info = chunk.header;
        } else if (chunk.type === 'pkt' && chunk.packet) {
            packets.push(chunk.packet);
        } else if (chunk.type === null) {
            // Unknown chunk type
        }
    }

    return { info, packets };
};

export default reader_lrpkt;
