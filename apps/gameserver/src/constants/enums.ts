
export enum team_e_obj {
	owner = 401,
	caster = 402,
	target = 403,
};

export enum CastType {
	instant = 0x0,
	/** targeted */
	missile = 0x1,
	chainMissile = 0x2,
	/** not targeted */
	arcMissile = 0x3,
	/** not used? */
	circleMissile = 0x4,
};

export enum SpawnType {
	hq = 0,
	location = 1,
	barracksLaneR = 2,
	barracksLaneC = 3,
	barracksLaneL = 4,
	dampenerLaneR = 5,
	dampenerLaneC = 6,
	dampenerLaneL = 7,
	//shop = 8,
};

export enum ForceMovementType {
	furthestWithinRange = 0x0,
	firstCollisionHit = 0x1,
	getNearestInRange = 0x2,
	getNearestInRangeIncludeUnits = 0x3,
	firstWallHit = 0x4,
};

export enum ForceMovementOrdersType {
	cancelOrder = 0x0,
	postponeCurrentOrder = 0x1,
};

export enum ForceMovementOrdersFacing {
	faceMovementDirection = 0x0,
	keepCurrentFacing = 0x1,
};

export enum ExtraAttributeFlag {
	hasSunglasses = 0x1,
};

export enum ChannelingStopCondition {
	notCancelled = 0x0,
	success = 0x1,
	cancel = 0x2,
};

export enum ChannelingStopSource {
	notCancelled = 0x0,
	timeCompleted = 0x1,
	animation = 0x2,
	lostTarget = 0x3,
	stunnedOrSilencedOrTaunted = 0x4,
	channelingCondition = 0x5,
	die = 0x6,
	heroReincarnate = 0x7,
	move = 0x8,
	attack = 0x9,
	casting = 0xA,
	unknown = 0xB,
};

//export enum SelectionPreference_e {
//    invalid = 0x0,
//    foe = 0x1,
//    friend = 0x2,
//    none = 0x3,
//};

//export enum missiletypes_e {
//    normal = 0x3E8,
//    ricochet = 0x3E9,
//};
