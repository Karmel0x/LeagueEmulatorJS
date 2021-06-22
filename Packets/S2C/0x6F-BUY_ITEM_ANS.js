var Item = {//S2C.BUY_ITEM_ANS
	ItemID: 'uint32',
	Slot: 'uint8',
	ItemsInSlot: 'uint8',
	SpellCharges: 'uint8',
};

module.exports = {
	cmd: 'uint8',
	netId: 'uint32',

	Item: Item,
	Bitfield: 'uint8',
};
