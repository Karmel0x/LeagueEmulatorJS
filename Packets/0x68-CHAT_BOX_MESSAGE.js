const ChatType = {
	ALL: 0,
	TEAM: 1,
};

function CHAT_BOX_MESSAGE_msg(buffer, object){
    object.msg = buffer.readobj(['char', object.messageSize]).join('');
    object.pad1 = buffer.read1('uint8');

}

module.exports = [{//CHAT_BOX_MESSAGE
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
}, CHAT_BOX_MESSAGE_msg
];
