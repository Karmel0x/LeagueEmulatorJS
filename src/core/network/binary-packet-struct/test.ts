import PacketReaderWriter, { Types } from './index';

var packet = new PacketReaderWriter(new DataView(new ArrayBuffer(1024)));

let bool = packet.read(Types.bool);
let uint8 = packet.read(Types.uint8);
let uint16 = packet.read(Types.uint16);
let uint32 = packet.read(Types.uint32);
let uint64 = packet.read(Types.uint64);
let int8 = packet.read(Types.int8);
let int16 = packet.read(Types.int16);
let int32 = packet.read(Types.int32);
let int64 = packet.read(Types.int64);
let float = packet.read(Types.float);
let double = packet.read(Types.double);
let char = packet.read(Types.char);
let string = packet.read(Types.string);
let string_ = packet.read(Types.string_);
let string0 = packet.read(Types.string0);

let bitfield = packet.read(Types.bitfield({
    bitnum1: Types.bitnum(1),
}));

let array = packet.read(Types.array(Types.uint8));

let object = packet.read({
    bool: Types.bool,
    uint8: Types.uint8,
    int8: Types.int8,
    float: Types.float,
    char: Types.char,
    bitfield: Types.bitfield({
        bitnum1: Types.bitnum(1),
    }),
});

let objectArray = packet.read(Types.array({
    bool: Types.bool,
    uint8: Types.uint8,
    int8: Types.int8,
    float: Types.float,
    char: Types.char,
    bitfield: Types.bitfield({
        bitnum1: Types.bitnum(1),
    }),
}));


let nn = packet.readStringified("int16");
let ss = packet.readStringified("string");

let oo = packet.read({
    bool: "bool",
});


const testStruct = {
    bool: Types.bool,
    uint8: Types.uint8,
    int8: Types.int8,
    float: Types.float,
    char: Types.char,
    bitfield: Types.bitfield({
        bitnum1: Types.bitnum(1),
    }),
    array: Types.array(Types.uint8),
    sizedArray: Types.array(Types.uint8, 5),
    object: {
        bool: Types.bool,
        uint8: Types.uint8,
        int8: Types.int8,
        float: Types.float,
        char: Types.char,
        bitfield: Types.bitfield({
            bitnum1: Types.bitnum(1),
        }),
    },
    objectArray: Types.array({
        bool: Types.bool,
        uint8: Types.uint8,
        int8: Types.int8,
        float: Types.float,
        char: Types.char,
        bitfield: Types.bitfield({
            bitnum1: Types.bitnum(1),
        }),
    }),
    sizedObjectArray: Types.array({
        bool: Types.bool,
        uint8: Types.uint8,
        int8: Types.int8,
        float: Types.float,
        char: Types.char,
        bitfield: Types.bitfield({
            bitnum1: Types.bitnum(1),
        }),
    }, 2),
};
console.log(JSON.stringify(testStruct, null, 2));
//console.log(testStruct);
console.log(packet.read(testStruct));
