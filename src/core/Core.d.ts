
// -------------------- init_utilities --------------------

interface String {
    toCapitalCase(): string;
    between(start: string, end: string): string;
}

interface Number {
    getRandom(min: number, max: number): number;
}

interface PromiseConstructor {
    wait(ms: number): Promise<void>;
}

// -------------------- Network --------------------

type PacketMessage = {
    peerNum: number;
    channel: number;
    //buffer: Buffer;
    buffer: ArrayBuffer;
};
