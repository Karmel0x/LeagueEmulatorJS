import Registry from '@workspace/network/packages/network/registry';

export enum channels {
    default = 0,
    c2s = 1,
    synchClock = 2,
    s2c = 3,
    s2cUnreliable = 4,
    chat = 5,
    quickChat = 6,
    loading = 7,
}

Registry.getPacketRegistry = function getPacketRegistry(channel: number, packetId: number) {
    if (channel === 0x00 && packetId === 0x00)
        return Registry.primary;

    if (channel === channels.loading || channel === channels.chat || channel === channels.quickChat)
        return Registry.primary;

    return Registry.base;
};
