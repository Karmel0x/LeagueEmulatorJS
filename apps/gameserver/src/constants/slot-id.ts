
export enum SlotType {
	spell = 0x0,
	inventory = 0x1,
	extra = 0x2,
	specialPassive = 0x3,
};

export enum SpellbookSlot {
	first = 0x0,
	second = 0x1,
	third = 0x2,
	fourth = 0x3,
};

export enum SummonerItemSlot {
	head = 0x0,
	chest = 0x1,
	legs = 0x2,
	hands = 0x3,
	feet = 0x4,
	weapons = 0x5,
	trinket = 0x6,
	consumable = 0x7,
};

export enum SummonerSpellSlot {
	one = 0x0,
	two = 0x1,
};

export enum SpecialSpellSlot {
	defaultInventorySlotMin = 0x0,
	ultimateSpellSlot = 0x3,
	defaultInventorySlotMax = 0x5,
	trinketSlot = 0x6,
	bluePillSlot = 0x7,
	extraItem2Slot = 0x8,
	temporaryItemSlotStart = 0x9,
	respawnSpellSlot = 0x10,
	useSpellSlot = 0x11,
	passiveSpellSlot = 0x12,
	slotless = 0xff,
};

export enum SpellSlotCount {
	numPassiveSlots = 0x1,
	numTemporaryInventorySlots = 0x1,
	numExtraInventorySlots = 0x2,
	numSecretExtraSlots = 0x2,
	maxSpellsPerChar = 0x4,
	maxRanksPerSpell = 0x6,
	numInventorySlots = 0x7,
	totalInventorySlots = 0xa,
	numSlotswithcastbits = 0xe,
	maxExtraSpellsPerChar = 0x10,
	numBasicAttackSlots = 0x12,
	numAvatarItemSlots = 0x1e,
	numInventorySlotsAndAvatar = 0x28,
	invalidInventorySlot = 0x29,
	maxSpellbookSlots = 0x3f,
};

export enum SpellSlotLocation {
	startSpellsSlot = 0x0,
	startItemSpellsSlot = 0x4,
	startAvatarItemSlot = 0xa,
	startExtraSlots = 0x2c,
};

export enum InventorySlotType {
	invalid = 0x0,
	standard = 0x1,
	extra = 0x2,
	temporary = 0x3,
	summoner = 0x4,
};

export enum SlotId {
	// spells (4) 0-3
	Q = 0,
	W = 1,
	E = 2,
	R = 3,

	// summoners (2) 4-5
	D = 4,
	F = 5,

	// items (7) 6-12
	I = 6,
	I2 = 7,
	I3 = 8,
	I4 = 9,
	I5 = 10,
	I6 = 11,
	I7 = 12,

	bluePill = 13,
	tempItem = 14,

	// runes (30) 15-44
	runes = 15,

	// extraSpells (16) 45-60
	Qm = 45,
	Qq = 46,

	respawnSpell = 61,
	useSpell = 62,
	passiveSpell = 63,

	// basicAttackNormalSlots (9) 64-72
	A = 64,
	A2 = 65,
	A3 = 66,
	A4 = 67,
	A5 = 68,
	A6 = 69,
	A7 = 70,
	A8 = 71,
	A9 = 72,

	// basicAttackCriticalSlots (9) 73-81
	C = 73,
	C2 = 74,
	C3 = 75,
	C4 = 76,
	C5 = 77,
	C6 = 78,
	C7 = 79,
	C8 = 80,
	C9 = 81,
};
