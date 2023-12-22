
import PacketReaderWriter from '../core/network/binary-packet-struct/index';

export default class BasePacket {

	static baseSize = 10240;
	static struct_header = {
		cmd: 'uint8',
		netId: 'uint32',
	} as object;
	static struct = {};

	static id = 0;
	static channel = 0;
	static channelName = '';

	static from(packetReaderWriter: PacketReaderWriter) {
		let packet = new this();
		packet.packetReaderWriter = packetReaderWriter;
		return packet;
	}

	static new(content: object & BasePacket) {
		let packet = new this();
		Object.assign(this, content);
		return packet;
	}

	packetReaderWriter?: PacketReaderWriter = undefined;

	cmd = this.id;

	get base() {
		return this.constructor as typeof BasePacket;
	}

	get id() {
		return this.base.id;
	}
	get name() {
		return this.base.name;
	}

	get channel() {
		return this.base.channel;
	}
	get channelName() {
		return this.base.channelName;
	}

	get baseSize() {
		return this.base.baseSize;
	}
	get struct_header() {
		return this.base.struct_header;
	}
	get struct() {
		return this.base.struct;
	}

	reader(packetReaderWriter: PacketReaderWriter) {
		Object.assign(this, packetReaderWriter.read(this.struct_header));
		Object.assign(this, packetReaderWriter.read(this.struct));
	}

	writer(packetReaderWriter: PacketReaderWriter) {
		packetReaderWriter.write(this.struct_header, this);
		packetReaderWriter.write(this.struct, this);
	}

	get content() {

		if (this.packetReaderWriter) {
			this.reader(this.packetReaderWriter);

			let { offset, length } = this.packetReaderWriter;
			if (offset != length) {
				console.log(
					`packet structure for ${this.channelName}.${this.name} is incorrect:`,
					`offset(${offset}) != length(${length})`,
					this.packetReaderWriter.buffer
				);
			}

			delete this.packetReaderWriter;
		}

		return this;
	}

	set content(value) {
		Object.assign(this, value);
	}

	get buffer() {

		if (!this.packetReaderWriter) {
			this.packetReaderWriter = PacketReaderWriter.fromSize(this.baseSize);
			this.writer(this.packetReaderWriter);
		}

		return this.packetReaderWriter.buffer.slice(0, this.packetReaderWriter.offset);
	}

}
