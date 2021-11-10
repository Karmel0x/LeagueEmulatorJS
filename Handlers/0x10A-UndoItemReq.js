const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
	player.inventory.UndoHistory.remUndoHistory()
};
