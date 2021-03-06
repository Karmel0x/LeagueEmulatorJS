module.exports = {
	category: {
		COMMAND: 0x0,
		CHARGE: 0x1,
		DANGER: 0x2,
		MIA: 0x3,//missing enemy
		OMW: 0x4,//ON_MY_WAY
		GETBACK: 0x5,
		COMEHERE: 0x6,
	},
	event: {
		OFFENSE_MARK_CHAMPION: 0x0,
		OFFENSE_MARK_LOCATION: 0x1,
		OFFENSE_DEFEND_LOCATION: 0x2,
		DANGER_FALL_BACK_GROUND: 0x3,
		DANGER_FALL_BACK: 0x4,
		DANGER_LEAVE_CHAMPION: 0x5,
		DANGER_LEAVE_LOCATION: 0x6,
		DANGER_ABANDON_LOCATION: 0x7,
		PING_THROTTLED: 0x8,
		GENERAL_MIA: 0x9,
		GENERAL_OMW: 0xA,
		GENERAL_GET_BACK: 0xB,
		GENERAL_COME_HERE: 0xC,
		COUNT: 0xD,
	},
	target: {
		NEUTRAL: 0x0,
		FRIENDLY: 0x1,
		ENEMY: 0x2,
		ORDER_SPECTATOR: 0x3,
		CHAOS_SPECTATOR: 0x4,
		ORDER_SPECTATOR_COLORBLIND: 0x5,
		CHAOS_SPECTATOR_COLORBLIND: 0x6,
	},
};
