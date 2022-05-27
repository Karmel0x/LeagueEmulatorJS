
const fs = require('fs');
global.packetLengthWarning = 50000;
require("../../Core/BufferExtend");


module.exports = function(filePath) {
    var f = fs.readFileSync(filePath);

    var header = f.readobj({
       magic: ['char', 4],
       size: 'uint32',
       pad: ['char', 8],
    });
   
   f.readobj(['char', header.size]); // json Match Data

    var readPacketChunk = (f) => {
        var packet = f.readobj({
            size: 'uint32',
            time: 'float',
            channel: 'uint8',
            reserved: ['uint8', 3],
        });

        var data = f.readobj(['uint8', packet.size]);

        return {
            Time: packet.time,
            Channel: packet.channel,
            BytesBuffer: Buffer.from(data),
            Flags: packet.reserved,
        }
    }
    
    var packets = [];

    while(f.off < f.length) {
        if(f.read1('uint8') == 'p'.charCodeAt(0))
            if(f.read1('uint8') == 'k'.charCodeAt(0))
                if(f.read1('uint8') == 't'.charCodeAt(0))
                    if(f.read1('uint8') == 0x00) {
                        var packet = readPacketChunk(f);
                        packets.push(packet);
                    }
    }

    return packets;
};
