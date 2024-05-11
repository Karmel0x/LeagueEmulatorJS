
export function ctrz(integer: number) {
    integer >>>= 0;
    if (integer === 0) {
        return 32;
    }
    integer &= -integer;
    return 31 - Math.clz32(integer);
}

export default class RelativeDataView {

    static from(buffer: ArrayBufferLike | Buffer) {
        if (buffer instanceof Buffer)
            buffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

        const dv = new DataView(buffer);
        return new RelativeDataView(dv);
    }

    static alloc(length: number) {
        let buffer = new ArrayBuffer(length);
        return this.from(buffer);
    }

    dv: DataView;
    littleEndian = true;
    offset = 0;

    /** buffer byte length */
    get length() {
        return this.dv.byteLength;
    }

    get bytesLeft() {
        return this.length - this.offset;
    }

    get buffer() {
        return this.dv.buffer;
    }

    get data() {
        return this.dv.buffer.slice(0, this.offset);
    }

    constructor(dv: DataView, littleEndian: boolean = true) {
        this.dv = dv;
        this.littleEndian = littleEndian;
    }

    readUint8() {
        return this.dv.getUint8(this.offset++);
    }

    readUint16() {
        return this.dv.getUint16((this.offset += 2) - 2, this.littleEndian);
    }

    readUint32() {
        return this.dv.getUint32((this.offset += 4) - 4, this.littleEndian);
    }

    readBigUint64() {
        return this.dv.getBigUint64((this.offset += 8) - 8, this.littleEndian);
    }

    readUint64() {
        return Number(this.readBigUint64());
    }

    readInt8() {
        return this.dv.getInt8(this.offset++);
    }

    readInt16() {
        return this.dv.getInt16((this.offset += 2) - 2, this.littleEndian);
    }

    readInt32() {
        return this.dv.getInt32((this.offset += 4) - 4, this.littleEndian);
    }

    readBigInt64() {
        return this.dv.getBigInt64((this.offset += 8) - 8, this.littleEndian);
    }

    readInt64() {
        return Number(this.readBigInt64());
    }

    readFloat32() {
        return this.dv.getFloat32((this.offset += 4) - 4, this.littleEndian);
    }

    readFloat() {
        return this.readFloat32();
    }

    readFloat64() {
        return this.dv.getFloat64((this.offset += 8) - 8, this.littleEndian);
    }

    readDouble() {
        return this.readFloat64();
    }

    readBool() {
        return !!this.readUint8();
    }

    readUint8Array(length: number) {
        let result = new Uint8Array(length);
        for (let i = 0; i < length; i++)
            result[i] = this.readUint8();

        return result;
    }

    readByteArray(length: number) {
        return this.readUint8Array(length);
    }

    readChar() {
        return String.fromCharCode(this.readUint8());
    }

    readString() {
        let str = '';
        let length = this.readUint32();

        for (let i = 0; i < length; i++) {
            let s = this.readUint8();
            str += String.fromCharCode(s);
        }

        return str;
    }

    readCharArray(length: number | undefined = undefined) {
        let str = '';
        length = length ?? this.readUint32();

        for (let i = 0; i < length; i++) {
            let s = this.readUint8();
            if (s == 0x00)
                break;

            str += String.fromCharCode(s);
        }

        this.offset += Math.max(0, length - (str.length + 1));
        return str;
    }

    readStringNullTerminated(maxLength = 0) {
        let str = '';

        while (this.offset < this.dv.byteLength) {
            let s = this.readUint8();
            if (s == 0x00)
                break;

            str += String.fromCharCode(s);
            if (maxLength && str.length >= maxLength)
                break;
        }

        return str;
    }

    unpackIntegerBitfield<T extends { [name: string]: number }>(fields: T, bitfield: number) {
        let result = {} as { [K in keyof T]: number };

        for (let i in fields) {
            let trailingZeros = ctrz(fields[i]);
            result[i] = (bitfield >>> trailingZeros) & (fields[i] >>> trailingZeros);
        }

        return result;
    }

    readIntegerBitfield<T extends { [name: string]: number }>(fields: T) {
        let bitfield = this.readUint8();
        return this.unpackIntegerBitfield(fields, bitfield);
    }

    unpackBooleanBitfield<T extends { [name: string]: number }>(fields: T, bitfield: number) {
        let result = {} as { [K in keyof T]: boolean };

        for (let i in fields)
            result[i] = (bitfield & fields[i]) != 0;

        return result;
    }

    readBitfield<T extends { [name: string]: number }>(fields: T) {
        let bitfield = this.readUint8();
        return this.unpackBooleanBitfield(fields, bitfield);
    }

    readBitfield64<T extends { [name: string]: number }>(fields: T) {
        let bitfield = this.readUint64();
        return this.unpackBooleanBitfield(fields, Number(bitfield));
    }

    readArray<T extends (...args: any[]) => any>(reader: T, length: number | undefined = undefined) {
        let result = [] as ReturnType<T>[];
        length = length ?? this.readUint8();

        for (let i = 0; i < length; i++)
            result.push(reader());

        return result;
    }

    writeUint8(value: number | undefined) {
        return this.dv.setUint8(this.offset++, value || 0);
    }

    writeUint16(value: number | undefined) {
        return this.dv.setUint16((this.offset += 2) - 2, value || 0, this.littleEndian);
    }

    writeUint32(value: number | undefined) {
        return this.dv.setUint32((this.offset += 4) - 4, value || 0, this.littleEndian);
    }

    writeBigUint64(value: bigint | undefined) {
        return this.dv.setBigUint64((this.offset += 8) - 8, value || 0n, this.littleEndian);
    }

    writeUint64(value: number | undefined) {
        return this.writeBigUint64(BigInt(value || 0));
    }

    writeInt8(value: number | undefined) {
        return this.dv.setInt8(this.offset++, value || 0);
    }

    writeInt16(value: number | undefined) {
        return this.dv.setInt16((this.offset += 2) - 2, value || 0, this.littleEndian);
    }

    writeInt32(value: number | undefined) {
        return this.dv.setInt32((this.offset += 4) - 4, value || 0, this.littleEndian);
    }

    writeBigInt64(value: bigint | undefined) {
        return this.dv.setBigInt64((this.offset += 8) - 8, value || 0n, this.littleEndian);
    }

    writeInt64(value: number | undefined) {
        return this.writeBigInt64(BigInt(value || 0));
    }

    writeFloat32(value: number | undefined) {
        return this.dv.setFloat32((this.offset += 4) - 4, value || 0, this.littleEndian);
    }

    writeFloat(value: number | undefined) {
        return this.writeFloat32(value || 0);
    }

    writeFloat64(value: number | undefined) {
        return this.dv.setFloat64((this.offset += 8) - 8, value || 0, this.littleEndian);
    }

    writeDouble(value: number | undefined) {
        return this.writeFloat64(value || 0);
    }

    writeBool(value: boolean | undefined) {
        return this.writeUint8(value ? 1 : 0);
    }

    writeByteArray(value: Uint8Array | number[] | undefined, length: number | undefined = undefined) {
        value = value || [];
        length = length ?? value.length;
        for (let i = 0; i < length; i++)
            this.writeUint8(value[i]);
    }

    writeChar(value: string | number | undefined) {
        if (typeof value === 'string')
            value = value.charCodeAt(0);

        return this.writeUint8(value || 0);
    }

    writeString(value: string | undefined) {
        value = value || '';
        let length = value.length;
        this.writeUint32(length);

        for (let i = 0; i < length; i++)
            this.writeUint8(value.charCodeAt(i) || 0);
    }

    writeCharArray(value: string | undefined, length: number | undefined = undefined) {
        value = value || '';
        if (length === undefined) {
            length = value.length;
            this.writeUint32(length);
        }

        for (let i = 0; i < length; i++) {
            if (i < value.length)
                this.writeUint8(value.charCodeAt(i));
            else
                this.writeUint8(0x00);
        }
    }

    writeStringNullTerminated(value: string | undefined, maxLength = 0) {
        value = value || '';
        if (!maxLength)
            maxLength = value.length + 1;

        for (let i = 0; i < maxLength; i++) {
            if (i < value.length)
                this.writeUint8(value.charCodeAt(i));
            else {
                this.writeUint8(0x00);
                break;
            }
        }
    }

    packIntegerBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: number }) {
        let bitfield = 0;
        for (let i in values) {
            if (values[i]) {
                if (values[i] > fields[i])
                    throw new Error(`value of ${i} (${values[i]}) is greater than the field (${fields[i]})`);

                bitfield |= values[i] << ctrz(fields[i]);
            }
        }
        return bitfield;
    }

    writeIntegerBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: number }) {
        let bitfield = this.packIntegerBitfield(fields, values);
        this.writeUint8(bitfield);
    }

    packBooleanBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: boolean }) {
        let bitfield = 0;
        for (let i in values) {
            if (values[i]) {
                bitfield |= fields[i];
            }
        }
        return bitfield;
    }

    writeBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: boolean }) {
        let bitfield = this.packBooleanBitfield(fields, values);
        this.writeUint8(bitfield);
    }

    writeBitfield64<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: boolean }) {
        let bitfield = this.packBooleanBitfield(fields, values);
        this.writeUint64(bitfield);
    }

    writeArray<U extends any, T extends (value: U) => void>(value: U[] | undefined, writer: T, length = 0) {
        value = value || [];

        if (!length) {
            length = value.length;
            this.writeUint8(length);
        }

        for (let i = 0; i < length; i++)
            writer(value[i]);
    }

}
