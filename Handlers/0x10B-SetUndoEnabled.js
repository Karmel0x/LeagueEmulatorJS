
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
	var SetUndoEnabled = createPacket('SetUndoEnabled');
    SetUndoEnabled.netId = player.netId;
    SetUndoEnabled.UndoStackSize = 1;
    var isSent = player.sendPacket(SetUndoEnabled);

    console.log('handle: S2C.SetUndoEnabled');
};