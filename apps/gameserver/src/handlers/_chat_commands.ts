
import * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export type Command = {
	description: string,
	arguments: string[],
	handler: (player: Player, args: string[]) => void,
};

const commandList: { [s: string]: Command; } = {
	'a': {
		description: 'test command',
		arguments: [],
		handler: function (player, args) {
			player.packets.chatBoxDebugMessage(...args);

		}
	},
	'help': {
		description: 'shows available player commands',
		arguments: [],
		handler: function (player, args) {

			const messages = [];
			for (const commandName in commandList) {
				const command = commandList[commandName as keyof typeof commandList]!;

				let commandLine = '.' + commandName;
				if (command.arguments && command.arguments.length)
					commandLine += ' ' + command.arguments.join(' ');
				if (command.description)
					commandLine += ' :: ' + command.description;

				messages.push(commandLine);
			}

			//messages.forEach((message, i) => {
			//	const packet1 = packets.HandleQuestUpdate.create({
			//		objective: `player commands ${i + 1}`,
			//		tooltip: message.slice(0, 128),
			//		//reward: message.slice(128, 257),
			//		questType: Math.floor(i / 3),
			//		questId: i,
			//	});
			//
			//	player.network.sendPacket(packet1);
			//});

			player.packets.chatBoxDebugMessage(messages.join('\n'));
		}
	},
	'': {
		description: 'run last command',
		arguments: [],
		handler: function (player, args) { },
	},
	'test': {
		description: '',
		arguments: [],
		handler: function (player, args) {

		}
	},
};

const aliasList: { [s: string]: string; } = {
	't': 'test',
};

export default (player: Player, packet: packets.ChatModel) => {

	if (!packet.message || (packet.message[0] !== '/' && packet.message[0] !== '\\'))
		return;

	let command = packet.message.slice(1);
	command = command || player.lastChatCommand;
	player.lastChatCommand = command;

	if (!command)
		return;

	const commandArgs = command.split(' ');
	let commandName = commandArgs[0];
	if (!commandName)
		return;

	let commandObject = commandList[commandName];

	if (!commandObject) {
		commandName = aliasList[commandName];
		if (!commandName)
			return;

		commandObject = commandList[commandName];
	}

	if (commandObject) {
		try {
			commandObject.handler(player, commandArgs);
		}
		catch (e) {
			console.warn(e);
			if (e instanceof Error) {
				player.packets.chatBoxDebugMessage('error:', e.message);
			}
		}
	}
};
