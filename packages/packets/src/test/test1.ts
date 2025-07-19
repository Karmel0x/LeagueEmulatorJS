
import Chat from '../primary/0x68-Chat';

import type Packet from '@repo/network/packets/packet';
import { PacketDebugger } from '@repo/network/packets/packet';
import Registry from '@repo/network/registry';
import RelativeDataView from '@repo/network/relative-data-view';
import { channels } from '../channels';

Registry.primary.register(Chat, 104, channels.chat);


function testWriter() {
    console.log('testWriter');
    let data = Chat.write({
        player: {
            clientId: 0,
            netId: 0,
        },
        chatType: 0,
        message: 'hello',
    });
    console.log(data);
    return data;
}

function testReader(data: ArrayBuffer) {
    console.log('testReader');
    let packetClass = Registry.primary.packets[104] as typeof Packet;
    let dvr = RelativeDataView.from(data);

    let payload = packetClass.read(dvr);
    console.log(payload, PacketDebugger.offsets);
}

function testReader2() {
    console.log('testReader2');
    let packetClass = Registry.primary.packets[104] as typeof Packet;

    let buffer = Buffer.from('68000000000000000000010000000000000007000000000050df0c0001000000f0c05b00f0c05b005cdf0c00c403c30148ea4202a0df73746f7020697400', 'hex');
    let dvr = RelativeDataView.from(buffer);

    let payload = packetClass.read(dvr);
    console.log(payload, PacketDebugger.offsets);
}

async function main() {

    let data = testWriter();
    testReader(data);

    testReader2();
}

main();
