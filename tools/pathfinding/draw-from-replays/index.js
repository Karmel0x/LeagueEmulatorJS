
const fs = require('fs');

require('../../../Core/init_utilities');
const _replayreaders = require('../../_replayreaders');
const HandlersParse = require('../../../Core/HandlersParse');
const IssueOrderReq = require('../../../Handlers/0x72-IssueOrderReq');


var replayDir = '../LeagueEmulatorJS_replays/';

var replayList = fs.readdirSync(replayDir).filter((value) => {
	return value.endsWith('.json') || value.endsWith('.lrpkt');
});

async function process(){
	for(var i = 0; i < replayList.length; i++){
		var replayFilename = replayList[i];
		var replayUnpacked = _replayreaders(replayDir + replayFilename);
	
		for(var j = 0; j < replayUnpacked.length; j++){
			var packet = replayUnpacked[j];
	
			if(packet.BytesBuffer.length < 5 || packet.BytesBuffer.readUInt8(0) != 0x61)//LOW_PRIORITY.WaypointGroup
				continue;
	
			var parsed = HandlersParse.parsePacket({
				channel: packet.Channel,
				buffer: packet.BytesBuffer,
			});
	
			if(!parsed || !parsed.movementData || parsed.movementData.length < 1)
				continue;
	
			for(var k = 0; k < parsed.movementData.length; k++){
				var movementData = parsed.movementData[k];
				if(!movementData || !movementData.waypoints || movementData.waypoints.length < 3)
					continue;
					
				IssueOrderReq({
					move0: () => {},
				}, {
					orderType: 2,//OrderTypes.rightClickMove
					movementData: {
						waypoints: movementData.waypoints,
					},
				});
				//console.log(packet, parsed);
			}
		}
		console.log(replayFilename, '>', 'done');
		await Promise.wait(1000);
		//break;
	}
	console.log('>>> all files done');
}

process();
