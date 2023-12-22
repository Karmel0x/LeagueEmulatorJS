
import fs from 'fs';
import Server from '../../src/app/Server';
import PacketReaderWriter, { Types } from '../../src/core/network/binary-packet-struct/index';
Server.packetLengthWarning = 50000;


export default function (filePath) {
    let f = fs.readFileSync(filePath);
    let packetReaderWriter = PacketReaderWriter.from(f);

    let header = packetReaderWriter.read({
        magic: ['char', 4],
        size: 'uint32',
        pad: ['char', 8],
    });

    packetReaderWriter.read(['char', header.size]);

    let readPacketChunk = (f) => {
        let packet = f.read({
            size: 'uint32',
            time: 'float',
            channel: 'uint8',
            reserved: ['uint8', 3],
        });

        let data = f.read(['uint8', packet.size]);

        return {
            Time: packet.time,
            Channel: packet.channel,
            BytesBuffer: Buffer.from(data),
            Flags: packet.reserved,
        };
    };

    let packets = [];

    while (packetReaderWriter.offset < f.length) {
        if (packetReaderWriter.read(Types.uint8) == 'p'.charCodeAt(0))
            if (packetReaderWriter.read(Types.uint8) == 'k'.charCodeAt(0))
                if (packetReaderWriter.read(Types.uint8) == 't'.charCodeAt(0))
                    if (packetReaderWriter.read(Types.uint8) == 0x00) {
                        let packet = readPacketChunk(packetReaderWriter);
                        packets.push(packet);
                    }
    }

    return packets;
}
