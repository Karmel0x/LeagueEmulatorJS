
const fs = require('fs');
require("../../src/core/BufferExtend");
const Server = require('../../src/app/Server');
Server.packetLengthWarning = 50000;


module.exports = function (filePath) {
    let f = fs.readFileSync(filePath);

    let header = f.readobj({
        magic: ['char', 4],
        size: 'uint32',
        pad: ['char', 8],
    });

    f.readobj(['char', header.size]); // json Match Data

    let readPacketChunk = (f) => {
        let packet = f.readobj({
            size: 'uint32',
            time: 'float',
            channel: 'uint8',
            reserved: ['uint8', 3],
        });

        let data = f.readobj(['uint8', packet.size]);

        return {
            Time: packet.time,
            Channel: packet.channel,
            BytesBuffer: Buffer.from(data),
            Flags: packet.reserved,
        };
    };

    let packets = [];

    while (f.off < f.length) {
        if (f.read1('uint8') == 'p'.charCodeAt(0))
            if (f.read1('uint8') == 'k'.charCodeAt(0))
                if (f.read1('uint8') == 't'.charCodeAt(0))
                    if (f.read1('uint8') == 0x00) {
                        let packet = readPacketChunk(f);
                        packets.push(packet);
                    }
    }

    return packets;
};
