
// -------------------- BufferExtend --------------------

interface BufferConstructor {
    typeSize: {
        'bool': 1,
        'uint8': 1,
        'uint16': 2,
        'uint32': 4,
        'uint64': 8,

        'int8': 1,
        'int16': 2,
        'int32': 4,
        'int64': 8,

        'float': 4,
        //'float8': 1,
        //'float16': 2,
        'double': 8,

        'char': 1,
        'string': 0,
        'string_': 0,
        'string0': 0,
        'bitfield': 1,
    };
    offDEBUG: {};
}

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
    buffer: Buffer;
};
