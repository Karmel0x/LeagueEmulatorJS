
function byteArrayToBinary(array){
    let ret = [];
    for(let i in array){
        let r = ('00000000' + array[i].toString(2)).substr(-8).split('').reverse();
        
        for(let j in r)
            ret.push(r[j] == '1');
    }
    return ret;
}

module.exports = function(buffer, size){//CompressedWaypoint
    var obj = {};
    obj.flagsBuffer = [];
    if(size > 1){
        obj.flagsBufferByte = buffer.readobj(['uint8', parseInt((size - 2) / 4 + 1)]);
        obj.flagsBuffer = byteArrayToBinary(obj.flagsBufferByte);
        //console.log('obj.flagsBufferByte, obj.flagsBuffer', obj.flagsBufferByte, obj.flagsBuffer);
    }

    obj.lastX = buffer.read1('int16');
    obj.lastY = buffer.read1('int16');
    obj.waypoints = [];
    obj.waypoints.push({X: obj.lastX, Y: obj.lastY});

    for (let i = 1, flag = 0; i < size; i++){

        if(obj.flagsBuffer[flag++])
            obj.lastX += buffer.read1('int8');
        else
            obj.lastX = buffer.read1('int16');

        if(obj.flagsBuffer[flag++])
            obj.lastY += buffer.read1('int8');
        else
            obj.lastY = buffer.read1('int16');

        obj.waypoints.push({X: obj.lastX, Y: obj.lastY});
    }

    return obj.waypoints;
};
