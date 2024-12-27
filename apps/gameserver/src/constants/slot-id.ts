
export enum SlotType {
	spell = 0x0,
	inventory = 0x1,
	extra = 0x2,
	specialPassive = 0x3,
};

export enum SpellbookType {
	champion,
	summoner,
	unknown,
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

const avatarSpellsCount = 0x2;

export enum SpellConstants {
	maxSpellsPerChar = 0x4,
	spellsItemsSlot = 0x4,
	maxExtraSpellsPerChar = 0x8,
	numInventorySlots = 0x6,
	numExtraInventorySlots = 0x1,
	numTemporaryInventorySlots = 0x1,
	numSecretExtraSlots = 0x2,
	bluePillSlot = 0x6,
	respawnSpellSlot = 0x8,
	useSpellSlot = 0x9,
	temporaryItemSlotStart = 0x7,
	totalInventorySlots = 0x8,
	avatarItemSlotStart = 0x8,
	numInventorySlotsAndAvatar = 0x26,
	numSlotswithcastbits = 0xc,
	maxSpellbookSlots = 0x34,
	startExtraSlots = 0x2a,
	numBasicAttackSlots = 0x7,
	numHitAttackSlots = 0x3,
}

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

export enum SpellSlotLocations {
	START_SPELLS_SLOT = 0x0,
	START_ITEM_SPELLS_SLOT = 0x4,
	START_EXTRA_SLOTS = 0x2C,
	START_AVATAR_ITEM_SLOT = 0xA,
}

export enum SlotId {
	// spells (4) 0-3
	q = 0,
	w = 1,
	e = 2,
	r = 3,

	// summoners (2) 4-5
	d = 4,
	f = 5,

	// items (7) 6-12
	i = 6,
	i2 = 7,
	i3 = 8,
	i4 = 9,
	i5 = 10,
	i6 = 11,
	i7 = 12,

	bluePill = 13,
	tempItem = 14,

	// runes (30) 15-44
	runes = 15,

	// extraSpells (16) 45-60
	es1 = 45,
	es2,
	es3,
	es4,
	es5,
	es6,
	es7,
	es8,
	es9,

	respawnSpell = 61,
	useSpell = 62,
	passiveSpell = 63,

	// basicAttackNormalSlots (9) 64-72
	a = 64,
	ea1 = 65,
	ea2 = 66,
	ea3 = 67,
	ea4 = 68,
	ea5 = 69,
	ea6 = 70,
	ea7 = 71,
	ea8 = 72,

	// basicAttackCriticalSlots (9) 73-81
	c = 73,
	c2 = 74,
	c3 = 75,
	c4 = 76,
	c5 = 77,
	c6 = 78,
	c7 = 79,
	c8 = 80,
	c9 = 81,
};
