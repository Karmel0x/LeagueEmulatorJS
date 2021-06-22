const ChatType = {
	ALL: 0,
	TEAM: 1,
};

module.exports = function(buffer){//COMMUNICATION.CHAT_BOX_MESSAGE
	
	var obj = buffer.readobj({
		cmd: 'uint8',
		//netId: 'uint32',
	
		ClientID: 'int32',
		netId: 'uint32',
		Localized: 'uint8',
		ChatType: 'uint32',
	
		paramsSize: 'int32',
		messageSize: 'int32',
		pars: ['uint8', 32],
		//msg: ['char', 'messageSize'],
		//pad1: 'uint8',
	});

    obj.msg = buffer.readobj(['char', obj.messageSize]).join('');
    obj.pad1 = buffer.read1('uint8');
	
	return obj;
};
