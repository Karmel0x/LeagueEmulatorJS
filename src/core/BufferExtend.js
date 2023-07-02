const Server = require("../app/Server");

Buffer.typeSize = {
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

Buffer.offDEBUG = {};
Buffer.prototype.off = 0;

/**
 * Reads a value of the specified type from the buffer.
 * @this {Buffer}
 * @param {keyof typeof Buffer.typeSize} type
 * @returns {any}
 */
Buffer.prototype.read1 = function (type) {

	let variable;
	try {
		switch (type) {
			case 'bool': variable = !!this.readUInt8(this.off); break;
			case 'uint8': variable = this.readUInt8(this.off); break;
			case 'uint16': variable = this.readUInt16LE(this.off); break;
			case 'uint32': variable = this.readUInt32LE(this.off); break;
			case 'uint64': variable = this.readBigUInt64LE(this.off); break;

			case 'int8': variable = this.readInt8(this.off); break;
			case 'int16': variable = this.readInt16LE(this.off); break;
			case 'int32': variable = this.readInt32LE(this.off); break;
			case 'int64': variable = this.readBigInt64LE(this.off); break;

			case 'float': variable = this.readFloatLE(this.off); break;
			/*case 'float8':{
				let bb = Buffer.from([0, 0, 0, this.readUInt8(this.off)]);
				variable = bb.readFloatLE(0);
			}break;
			case 'float16':{
				let bb = Buffer.from([0, 0, this.readUInt8(this.off), this.readUInt8(this.off + 1)]);
				variable = bb.readFloatLE(0);
			}break;*/
			case 'double': variable = this.readDoubleLE(this.off); break;

			case 'char': {
				variable = String.fromCharCode(this.readUInt8(this.off));
				if (variable == '\0')
					variable = '';
			} break;
			case 'string': {
				variable = '';
				let stringLength = this.readInt32LE(this.off);
				this.off += 4;
				for (let i = 0; i < stringLength; i++) {
					variable += String.fromCharCode(this.readUInt8(this.off));
					this.off += 1;
				}
			} break;
			case 'string_': {
				variable = '';
				let stringLength = this.readInt32LE(this.off) - 1;
				this.off += 4;
				for (let i = 0; i < stringLength; i++) {
					variable += String.fromCharCode(this.readUInt8(this.off));
					this.off += 1;
				}
				this.readUInt8(this.off);
				this.off += 1;
			} break;
			case 'string0': {
				variable = '';
				while (this.off < this.length) {
					let s = this.readUInt8(this.off);
					this.off += 1;
					if (s == 0x00)
						break;
					variable += String.fromCharCode(s);
				}
			} break;
		}
	} catch (e) {
		//console.log('packet structure is incorrect :', e.message);
		//console.trace();
	}

	this.off += Buffer.typeSize[type] || 0;
	return variable;
};

/**
 * Writes a value of the specified type to the buffer.
 * @this {Buffer}
 * @param {keyof typeof Buffer.typeSize} type
 * @param {any} value
 * @returns
 */
Buffer.prototype.write1 = function (type, value) {
	value = value || 0;

	//todo: buffer expand if overflowing

	//console.log(type, value, this.off);
	let variable;
	switch (type) {
		// @ts-ignore
		case 'bool': variable = this.writeUInt8(!!value, this.off); break;
		case 'uint8': variable = this.writeUInt8(value, this.off); break;
		case 'uint16': variable = this.writeUInt16LE(value, this.off); break;
		case 'uint32': variable = this.writeUInt32LE(value, this.off); break;
		case 'uint64': variable = this.writeBigUInt64LE(BigInt(value), this.off); break;

		case 'int8': variable = this.writeInt8(value, this.off); break;
		case 'int16': variable = this.writeInt16LE(value, this.off); break;
		case 'int32': variable = this.writeInt32LE(value, this.off); break;
		case 'int64': variable = this.writeBigInt64LE(BigInt(value), this.off); break;

		case 'float': variable = this.writeFloatLE(value, this.off); break;
		case 'double': variable = this.writeDoubleLE(value, this.off); break;

		case 'char': variable = this.writeUInt8(typeof value == 'string' ? value.charCodeAt(0) : value, this.off); break;
		case 'string': {
			let stringLength = value.length;
			variable = this.writeInt32LE(stringLength, this.off);
			this.off += 4;
			for (let i = 0; i < stringLength; i++) {
				variable = this.writeUInt8(value.charCodeAt(i), this.off);
				this.off += 1;
			}
		} break;
		case 'string_': {
			let stringLength = value.length;
			variable = this.writeInt32LE(stringLength + 1, this.off);
			this.off += 4;
			for (let i = 0; i < stringLength; i++) {
				variable = this.writeUInt8(value.charCodeAt(i), this.off);
				this.off += 1;
			}
			variable = this.writeUInt8(0x00, this.off);
			this.off += 1;
		} break;
		case 'string0': {
			let stringLength = value.length;
			for (let i = 0; i < stringLength; i++) {
				variable = this.writeUInt8(value.charCodeAt(i), this.off);
				this.off += 1;
			}
			variable = this.writeUInt8(0x00, this.off);
			this.off += 1;
		} break;
	}

	this.off += Buffer.typeSize[type] || 0;
	return variable;
};

/**
 * Reads an object from the buffer using the specified template.
 * @this {Buffer}
 * @param {Object | keyof typeof Buffer.typeSize} template
 * @returns {Object | string}
 */
Buffer.prototype.readobj = function (template) {

	try {
		if (typeof template == 'string')
			return this.read1(template);

		if (typeof template == 'object') {
			if (Array.isArray(template)) {
				if (template[0] === 'bitfield') {
					let bitfield = this.read1('uint8');
					let obj = {};

					for (let i in template[1])
						obj[i] = (bitfield & template[1][i]) != 0;

					return obj;
				}
				else if (template[0] === 'bitfield64') {
					let bitfield = this.read1('uint64');
					let obj = {};

					for (let i in template[1])
						obj[i] = (bitfield & BigInt(template[1][i])) != 0;

					return obj;
				}

				let obj = [];
				if (template[1] > (this.length - this.off)) {
					console.log('packet is incorrect, got length > left length', template);
					console.trace();
					return obj;
				}
				if (template[1] > Server.packetLengthWarning) {
					console.log('packet is probably incorrect, got length > 1000', template);
					console.trace();
					return obj;
				}
				for (let j = 0; j < template[1]; j++) {
					obj[j] = this.readobj(template[0]);
					//console.log(template[0], this.off);
				}
				if (template[0] === 'char')
					obj = obj.join('');
				return obj;
			}

			let obj = {};
			for (let i in template) {
				//if(typeof template[i]?.[1] == 'string')
				//	template[i][1] = obj[template[i][1]];

				Buffer.offDEBUG[i] = this.off;
				obj[i] = this.readobj(template[i]);
				//console.log(template[i], this.off);
			}
			return obj;
		}
	}
	catch (e) {
		console.log(e.stack);
	}
	return {};
};

/**
 * Writes an object to the buffer using the specified template.
 * @this {Buffer}
 * @param {Object | keyof typeof Buffer.typeSize} template
 * @param {any} source
 */
Buffer.prototype.writeobj = function (template, source) {
	try {
		//console.log('writeobj', template, source);

		if (typeof template == 'string')
			return this.write1(template, source || 0);

		if (typeof template == 'object') {
			if (Array.isArray(template)) {
				if (template[0] === 'bitfield') {
					let bitfield = 0;

					for (let i in source)
						bitfield |= !!source[i] * template[1][i];

					this.write1('uint8', bitfield);
					return;
				}
				else if (template[0] === 'bitfield64') {
					let bitfield = 0n;

					for (let i in source)
						bitfield |= BigInt(!!source[i]) * BigInt(template[1][i]);

					this.write1('uint64', bitfield);
					return;
				}
				for (let j = 0; j < template[1]; j++) {
					this.writeobj(template[0], source[j] || 0);
					//console.log(template[0], this.off);
				}
				return;
			}

			for (let i in template) {
				if (typeof template[i]?.[1] == 'string')
					template[i][1] = source[template[i][1]];

				this.writeobj(template[i], source[i] || 0);
				//console.log(template[i], this.off);
			}
		}
	}
	catch (e) {
		console.log(e.stack);
	}
};

/**
 * @this {Buffer}
 * @returns
 */
Buffer.prototype.toArrayInteger = function () {
	if (this.length <= 0)
		return [];

	const data = new Array(this.length);
	for (let i = 0; i < this.length; ++i)
		data[i] = this[i];
	return data;
};

module.exports = {};
