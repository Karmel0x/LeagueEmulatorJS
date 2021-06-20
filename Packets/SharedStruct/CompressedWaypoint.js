var Types = require('../../Constants/Types');

function getInt64Bytes_reversed(x){
    var bytes = [];
    for(var i = 8; i > 0; --i){
        bytes.push(x & 255);
        x = x >> 8;
    }
    return bytes;
}
function binaryToByteArray(binaryArray){
    return parseInt(binaryArray.split('').reverse().join(''), 2);
}

module.exports = (buffer, Waypoints) => {//CompressedWaypoint
    var relativeWaypoints = [];
    var flagsBinary = '';

    if(Waypoints.length > 1){
        for (let i = 1; i < Waypoints.length; i++){
            let relativeWaypoint = {
                X: Waypoints[i].X - Waypoints[i - 1].X,
                Y: Waypoints[i].Y - Waypoints[i - 1].Y,
            };
            relativeWaypoints.push(relativeWaypoint);
            
            flagsBinary += +(relativeWaypoint.X <= Types.maxValues['int8'] && relativeWaypoint.X >= Types.minValues['int8']);
            flagsBinary += +(relativeWaypoint.Y <= Types.maxValues['int8'] && relativeWaypoint.Y >= Types.minValues['int8']);
        }
        
        var flagsBuffer = getInt64Bytes_reversed(binaryToByteArray(flagsBinary));
        var flagsCount = parseInt((Waypoints.length - 2) / 4 + 1);
        buffer.writeobj(['uint8', flagsCount], flagsBuffer);

        //console.log('flagsBinary, Types.maxValues, flagsBuffer', flagsBinary, Types.maxValues, flagsBuffer);
    }

    buffer.write1('int16',  Waypoints[0].X);
    buffer.write1('int16',  Waypoints[0].Y);

    for(let i = 1, flag = 0; i < Waypoints.length; i++){
        if(flagsBinary[flag++] == '1')
            buffer.write1('int8',  relativeWaypoints[i-1].X);
        else
            buffer.write1('int16',  Waypoints[i].X);

        if(flagsBinary[flag++] == '1')
            buffer.write1('int8',  relativeWaypoints[i-1].Y);
        else
            buffer.write1('int16',  Waypoints[i].Y);
    }

};
