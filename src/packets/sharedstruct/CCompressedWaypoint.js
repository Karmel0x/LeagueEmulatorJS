import Types from '../../constants/Types.js';
import BinaryHelper from '../../functions/BinaryHelper.js';


export default {//CCompressedWaypoint
	reader: (buffer, size) => {
		let obj = {
			flagsBuffer: [],
			waypoints: [],
		};

		if (size > 1) {
			obj.flagsBufferByte = buffer.read(['uint8', parseInt((size - 2) / 4 + 1)]);
			obj.flagsBuffer = BinaryHelper.byteArrayToBinary(obj.flagsBufferByte);
			//console.log('obj.flagsBufferByte, obj.flagsBuffer', obj.flagsBufferByte, obj.flagsBuffer);
		}

		obj.lastX = buffer.read('int16');
		obj.lastY = buffer.read('int16');
		obj.waypoints.push({ x: obj.lastX, y: obj.lastY });

		for (let i = 1, flag = 0; i < size; i++) {

			if (obj.flagsBuffer[flag++])
				obj.lastX += buffer.read('int8');
			else
				obj.lastX = buffer.read('int16');

			if (obj.flagsBuffer[flag++])
				obj.lastY += buffer.read('int8');
			else
				obj.lastY = buffer.read('int16');

			obj.waypoints.push({ x: obj.lastX, y: obj.lastY });
		}

		return obj.waypoints;
	},
	writer: (buffer, waypoints) => {
		let relativeWaypoints = [];
		let flagsBinary = '';

		if (waypoints.length > 1) {
			for (let i = 1; i < waypoints.length; i++) {
				let relativeWaypoint = {
					X: waypoints[i].x - waypoints[i - 1].x,
					Y: waypoints[i].y - waypoints[i - 1].y,
				};
				relativeWaypoints.push(relativeWaypoint);

				flagsBinary += +(relativeWaypoint.x <= Types.maxValues['int8'] && relativeWaypoint.x >= Types.minValues['int8']);
				flagsBinary += +(relativeWaypoint.y <= Types.maxValues['int8'] && relativeWaypoint.y >= Types.minValues['int8']);
			}

			let flagsBuffer = BinaryHelper.getIntBytes_r(BinaryHelper.binaryToByteArray(flagsBinary), 8);
			let flagsCount = parseInt((waypoints.length - 2) / 4 + 1);
			buffer.write(['uint8', flagsCount], flagsBuffer);

			//console.log('flagsBinary, Types.maxValues, flagsBuffer', flagsBinary, Types.maxValues, flagsBuffer);
		}

		buffer.write('int16', waypoints[0].x);
		buffer.write('int16', waypoints[0].y);

		for (let i = 1, flag = 0; i < waypoints.length; i++) {
			if (flagsBinary[flag++] == '1')
				buffer.write('int8', relativeWaypoints[i - 1].x);
			else
				buffer.write('int16', waypoints[i].x);

			if (flagsBinary[flag++] == '1')
				buffer.write('int8', relativeWaypoints[i - 1].y);
			else
				buffer.write('int16', waypoints[i].y);
		}

	}
};
