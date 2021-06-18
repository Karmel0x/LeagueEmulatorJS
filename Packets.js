var Packets = {};

Packets.Header = {
	cmd: 'uint8',
	netId: 'uint32',
};

Packets.channels = {
	CHL_HANDSHAKE: 0,
	CHL_C2S: 1,
	CHL_GAMEPLAY: 2,
	CHL_S2C: 3,
	CHL_LOW_PRIORITY: 4,
	CHL_COMMUNICATION: 5,
	CHL_LOADING_SCREEN: 7
};

//todo: separate packets by channels?
Packets.cmd = {
	KEY_CHECK:								{id: 0x00, channel: Packets.channels.CHL_HANDSHAKE, packet: require('./Packets/0x00-KEY_CHECK.js')},
	S2C_RESTRICT_CAMERA_MOVEMENT:			{id: 0x06, channel: Packets.channels.CHL_S2C},
	C2S_HEART_BEAT:							{id: 0x08, channel: Packets.channels.CHL_C2S},
	C2S_SELL_ITEM:							{id: 0x09, channel: Packets.channels.CHL_C2S},
	UNPAUSE_GAME:							{id: 0x0A, channel: 0},
	S2C_REMOVE_ITEM:						{id: 0x0B, channel: Packets.channels.CHL_S2C},
	S2C_NEXT_AUTO_ATTACK:					{id: 0x0C, channel: Packets.channels.CHL_S2C},
	S2C_EDIT_MESSAGE_BOX_TOP:				{id: 0x0D, channel: Packets.channels.CHL_S2C},
	S2C_UNLOCK_CAMERA:						{id: 0x0E, channel: Packets.channels.CHL_S2C},
	S2C_ADD_XP:								{id: 0x10, channel: Packets.channels.CHL_S2C},
	S2C_END_SPAWN:							{id: 0x11, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x11-S2C_END_SPAWN.js')},
	S2C_GAME_SPEED:							{id: 0x12, channel: Packets.channels.CHL_S2C},
	C2S_QUERY_STATUS_REQ:					{id: 0x14, channel: Packets.channels.CHL_C2S},
	S2C_SKILL_UP:							{id: 0x15, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x15-S2C_SKILL_UP.js')},
	C2S_PING_LOAD_INFO:						{id: 0x16, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x16-C2S_PING_LOAD_INFO.js')},
	S2C_CHANGE_SPELL:						{id: 0x17, channel: Packets.channels.CHL_S2C},
	S2C_FLOATING_TEXT:						{id: 0x18, channel: Packets.channels.CHL_S2C},
	S2C_FLOATING_TEXT_WITH_VALUE:			{id: 0x19, channel: Packets.channels.CHL_S2C},
	C2S_SWAP_ITEMS:							{id: 0x20, channel: Packets.channels.CHL_C2S},
	S2C_BEGIN_AUTO_ATTACK:					{id: 0x1A, channel: Packets.channels.CHL_S2C},
	S2C_CHAMPION_DIE2:						{id: 0x1B, channel: Packets.channels.CHL_S2C},
	S2C_EDIT_BUFF:							{id: 0x1C, channel: Packets.channels.CHL_S2C},
	S2C_ADD_GOLD:							{id: 0x22, channel: Packets.channels.CHL_S2C},
	S2C_FOG_UPDATE2:						{id: 0x23, channel: Packets.channels.CHL_S2C},
	S2C_MOVE_CAMERA:						{id: 0x25, channel: Packets.channels.CHL_S2C},
	S2C_SOUND_SETTINGS:						{id: 0x27, channel: Packets.channels.CHL_S2C},
	S2C_AVATAR_INFO:						{id: 0x2A, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x2A-S2C_AVATAR_INFO.js')},
	S2C_INHIBITOR_STATE:					{id: 0x2B, channel: Packets.channels.CHL_S2C},
	S2C_VIEW_ANS:							{id: 0x2C, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x2C-S2C_VIEW_ANS.js')},
	C2S_VIEW_REQ:							{id: 0x2E, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x2E-C2S_VIEW_REQ.js')},
	S2C_CHAMPION_RESPAWN:					{id: 0x2F, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x2F-S2C_CHAMPION_RESPAWN.js')},
	S2C_ADD_UNIT_FOW:						{id: 0x33, channel: Packets.channels.CHL_S2C},
	S2C_STOP_AUTO_ATTACK:					{id: 0x34, channel: Packets.channels.CHL_S2C},
	S2C_DELETE_OBJECT:						{id: 0x35, channel: Packets.channels.CHL_S2C}, // not sure what this is, ], happens when turret leaves vision
	S2C_MESSAGE_BOX_TOP:					{id: 0x36, channel: Packets.channels.CHL_S2C},
	S2C_DESTROY_OBJECT:						{id: 0x38, channel: Packets.channels.CHL_S2C},
	C2S_SKILL_UPGRADE:						{id: 0x39, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x39-C2S_SKILL_UPGRADE.js')},
	C2S_USE_OBJECT:							{id: 0x3A, channel: Packets.channels.CHL_C2S},
	S2C_SPAWN_PROJECTILE:					{id: 0x3B, channel: Packets.channels.CHL_S2C},
	S2C_SWAP_ITEMS:							{id: 0x3E, channel: Packets.channels.CHL_S2C},
	S2C_LEVEL_UP:							{id: 0x3F, channel: Packets.channels.CHL_S2C},
	S2C_ATTENTION_PING:						{id: 0x40, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x40-S2C_ATTENTION_PING.js')},
	S2C_EMOTION:							{id: 0x42, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x42-S2C_EMOTION.js')},
	S2C_PLAY_SOUND:							{id: 0x43, channel: Packets.channels.CHL_S2C},
	S2C_ANNOUNCE:							{id: 0x45, channel: Packets.channels.CHL_S2C},
	S2C_PLAYER_STATS:						{id: 0x46, channel: Packets.channels.CHL_S2C},
	C2S_AUTO_ATTACK_OPTION:					{id: 0x47, channel: Packets.channels.CHL_C2S},
	C2S_EMOTION:							{id: 0x48, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x48-C2S_EMOTION.js')},
	S2C_HERO_SPAWN:							{id: 0x4C, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x4C-S2C_HERO_SPAWN.js')},
	S2C_FACE_DIRECTION:						{id: 0x50, channel: Packets.channels.CHL_S2C},
	S2C_LEAVE_VISION:						{id: 0x51, channel: Packets.channels.CHL_S2C},
	C2S_START_GAME:							{id: 0x52, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x52-C2S_START_GAME.js')},
	S2C_SYNCH_VERSION:						{id: 0x54, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x54-S2C_SYNCH_VERSION.js')},
	S2C_BLUE_TIP:							{id: 0x55, channel: Packets.channels.CHL_S2C},
	C2S_SCOREBOARD:							{id: 0x56, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x56-C2S_SCOREBOARD.js')},
	C2S_ATTENTION_PING:						{id: 0x57, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x57-C2S_ATTENTION_PING.js')},
	S2C_HIGHLIGHT_UNIT:						{id: 0x59, channel: Packets.channels.CHL_S2C},
	S2C_DESTROY_PROJECTILE:					{id: 0x5A, channel: Packets.channels.CHL_S2C},
	S2C_START_GAME:							{id: 0x5C, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x5C-S2C_START_GAME.js')},
	S2C_CHAMPION_DIE:						{id: 0x5E, channel: Packets.channels.CHL_S2C},
	S2C_MOVE_ANS:							{id: 0x61, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x61-S2C_MOVE_ANS.js')},
	S2C_START_SPAWN:						{id: 0x62, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x62-S2C_START_SPAWN.js')},
	//S2C_DASH:								{id: 0x64, channel: Packets.channels.CHL_S2C},
	C2S_CLIENT_READY:						{id: 0x64, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x64-C2S_CLIENT_READY.js')},
	//S2C_DAMAGE_DONE:						{id: 0x65, channel: Packets.channels.CHL_S2C},
	S2C_LOAD_HERO:							{id: 0x65, channel: Packets.channels.CHL_LOADING_SCREEN, packet: require('./Packets/0x65-S2C_LOAD_HERO.js')},
	S2C_LOAD_NAME:							{id: 0x66, channel: Packets.channels.CHL_LOADING_SCREEN, packet: require('./Packets/0x66-S2C_LOAD_NAME.js')},
	//S2C_MODIFY_SHIELD:					{id: 0x66, channel: Packets.channels.CHL_S2C},
	S2C_LOAD_SCREEN_INFO:					{id: 0x67, channel: Packets.channels.CHL_LOADING_SCREEN, packet: require('./Packets/0x67-S2C_LOAD_SCREEN_INFO.js')},
	CHAT_BOX_MESSAGE:						{id: 0x68, channel: 0},
	S2C_SET_TARGET:							{id: 0x6A, channel: Packets.channels.CHL_S2C},
	S2C_SET_ANIMATION:						{id: 0x6B, channel: Packets.channels.CHL_S2C},
	C2S_BLUE_TIP_CLICKED:					{id: 0x6D, channel: Packets.channels.CHL_C2S},
	S2C_SHOW_PROJECTILE:					{id: 0x6E, channel: Packets.channels.CHL_S2C},
	S2C_BUY_ITEM_ANS:						{id: 0x6F, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x6F-S2C_BUY_ITEM_ANS.js')},
	S2C_FREEZE_UNIT_ANIMATION:				{id: 0x71, channel: Packets.channels.CHL_S2C},
	C2S_MOVE_REQ:							{id: 0x72, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x72-C2S_MOVE_REQ.js')},
	S2C_SET_CAMERA_POSITION:				{id: 0x73, channel: Packets.channels.CHL_S2C},
	C2S_MOVE_CONFIRM:						{id: 0x77, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x77-C2S_MOVE_CONFIRM.js')},
	S2C_REMOVE_BUFF:						{id: 0x7B, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x77-C2S_MOVE_CONFIRM.js')},
	C2S_LOCK_CAMERA:						{id: 0x81, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0x81-C2S_LOCK_CAMERA.js')},
	C2S_BUY_ITEM_REQ:						{id: 0x82, channel: Packets.channels.CHL_C2S},
	S2C_TOGGLE_INPUT_LOCKING_FLAG:			{id: 0x84, channel: Packets.channels.CHL_S2C},
	S2C_SET_COOLDOWN:						{id: 0x85, channel: Packets.channels.CHL_S2C},
	S2C_SPAWN_PARTICLE:						{id: 0x87, channel: Packets.channels.CHL_S2C},
	S2C_QUERY_STATUS_ANS:					{id: 0x88, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x88-S2C_QUERY_STATUS_ANS.js')},
	S2C_EXPLODE_NEXUS:						{id: 0x89, channel: Packets.channels.CHL_S2C}, // <-- Building_Die?
	S2C_INHIBITOR_DEATH_ANIMATION:			{id: 0x89, channel: Packets.channels.CHL_S2C}, // <--
	S2C_QUEST:								{id: 0x8C, channel: Packets.channels.CHL_S2C},
	C2S_EXIT:								{id: 0x8F, channel: Packets.channels.CHL_C2S, /*packet: Packets.Header*/},
	C2S_WORLD_SEND_GAME_NUMBER:				{id: 0x92, channel: Packets.channels.CHL_C2S}, // <-- At least one of these is probably wrong
	S2C_WORLD_SEND_GAME_NUMBER:				{id: 0x92, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x92-S2C_WORLD_SEND_GAME_NUMBER.js')}, // <--
	S2C_PING_LOAD_INFO:						{id: 0x95, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0x95-S2C_PING_LOAD_INFO.js')},
	S2C_CHANGE_CHARACTER_VOICE:				{id: 0x96, channel: Packets.channels.CHL_S2C},
	S2C_UPDATE_MODEL:						{id: 0x97, channel: Packets.channels.CHL_S2C},
	S2C_DISCONNECTED_ANNOUNCEMENT:			{id: 0x98, channel: Packets.channels.CHL_S2C},
	C2S_CAST_SPELL:							{id: 0x9A, channel: Packets.channels.CHL_C2S},
	S2C_TURRET_SPAWN:						{id: 0x9D, channel: Packets.channels.CHL_S2C},
	S2C_NPC_HIDE:							{id: 0x9E, channel: Packets.channels.CHL_S2C}, // (4.18) not sure what this became
	S2C_SET_ITEM_STACKS:					{id: 0x9F, channel: Packets.channels.CHL_S2C},
	S2C_MESSAGE_BOX_RIGHT:					{id: 0xA0, channel: Packets.channels.CHL_S2C},
	PAUSE_GAME:								{id: 0xA1, channel: 0},
	S2C_REMOVE_MESSAGE_BOX_TOP:				{id: 0xA2, channel: Packets.channels.CHL_S2C},
	S2C_ANNOUNCE2:							{id: 0xA3, channel: Packets.channels.CHL_S2C}, // ? idk
	C2S_SURRENDER:							{id: 0xA4, channel: Packets.channels.CHL_C2S},
	S2C_SURRENDER_RESULT:					{id: 0xA5, channel: Packets.channels.CHL_S2C},
	S2C_REMOVE_MESSAGE_BOX_RIGHT:			{id: 0xA7, channel: Packets.channels.CHL_S2C},
	C2S_STATS_CONFIRM:						{id: 0xA8, channel: Packets.channels.CHL_C2S},
	S2C_ENABLE_FOW:							{id: 0xAB, channel: Packets.channels.CHL_S2C},
	S2C_SET_HEALTH:							{id: 0xAE, channel: Packets.channels.CHL_S2C},
	C2S_CLICK:								{id: 0xAF, channel: Packets.channels.CHL_C2S},
	S2C_SPELL_ANIMATION:					{id: 0xB0, channel: Packets.channels.CHL_S2C},
	S2C_EDIT_MESSAGE_BOX_RIGHT:				{id: 0xB1, channel: Packets.channels.CHL_S2C},
	S2C_SET_MODEL_TRANSPARENCY:				{id: 0xB2, channel: Packets.channels.CHL_S2C},
	S2C_BASIC_TUTORIAL_MESSAGE_WINDOW:		{id: 0xB3, channel: Packets.channels.CHL_S2C},
	S2C_REMOVE_HIGHLIGHT_UNIT:				{id: 0xB4, channel: Packets.channels.CHL_S2C},
	S2C_CAST_SPELL_ANS:						{id: 0xB5, channel: Packets.channels.CHL_S2C},
	S2C_ADD_BUFF:							{id: 0xB7, channel: Packets.channels.CHL_S2C},
	S2C_AFK_WARNING_WINDOW:					{id: 0xB8, channel: Packets.channels.CHL_S2C},
	S2C_OBJECT_SPAWN:						{id: 0xBA, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0xBA-S2C_OBJECT_SPAWN.js')},
	S2C_HIDE_UI:							{id: 0xBC, channel: Packets.channels.CHL_S2C},
	C2S_SYNCH_VERSION:						{id: 0xBD, channel: Packets.channels.CHL_C2S, packet: require('./Packets/0xBD-C2S_SYNCH_VERSION.js')},
	C2S_CHAR_LOADED:						{id: 0xBE, channel: Packets.channels.CHL_C2S},
	S2C_SET_TARGET2:						{id: 0xC0, channel: Packets.channels.CHL_S2C}, // format is [Net ID 1], [Net ID 2],, ], purpose still unknown
	S2C_GAME_TIMER:							{id: 0xC1, channel: Packets.channels.CHL_S2C},
	S2C_GAME_TIMER_UPDATE:					{id: 0xC2, channel: Packets.channels.CHL_S2C},
	S2C_CHAR_STATS:							{id: 0xC4, channel: Packets.channels.CHL_S2C, packet: require('./Packets/0xC4-S2C_CHAR_STATS.js')},
	S2C_GAME_END:							{id: 0xC6, channel: Packets.channels.CHL_S2C},
	S2C_SURRENDER:							{id: 0xC9, channel: Packets.channels.CHL_S2C},
	C2S_QUEST_CLICKED:						{id: 0xCD, channel: Packets.channels.CHL_C2S},
	S2C_SHOW_HP_AND_NAME:					{id: 0xCE, channel: Packets.channels.CHL_S2C},
	S2C_LEVEL_PROP_SPAWN:					{id: 0xD0, channel: Packets.channels.CHL_S2C},
	S2C_LEVEL_PROP_ANIMATION:				{id: 0xD1, channel: Packets.channels.CHL_S2C},
	S2C_SET_CAPTURE_POINT:					{id: 0xD3, channel: Packets.channels.CHL_S2C},
	S2C_CHANGE_CRYSTAL_SCAR_NEXUS_HP:		{id: 0xD4, channel: Packets.channels.CHL_S2C},
	S2C_SET_TEAM:							{id: 0xD7, channel: Packets.channels.CHL_S2C},
	S2C_ATTACH_MINIMAP_ICON:				{id: 0xD8, channel: Packets.channels.CHL_S2C},
	S2C_DOMINION_POINTS:					{id: 0xD9, channel: Packets.channels.CHL_S2C},
	S2C_SET_SCREEN_TINT:					{id: 0xDB, channel: Packets.channels.CHL_S2C},
	S2C_CLOSE_GAME:							{id: 0xE5, channel: Packets.channels.CHL_S2C},
	C2S_SPELL_CHARGE_UPDATE:				{id: 0xE6, channel: Packets.channels.CHL_C2S},
	S2C_DEBUG_MESSAGE:						{id: 0xF7, channel: Packets.channels.CHL_S2C},
	S2C_MESSAGES_AVAILABLE:					{id: 0xF9, channel: Packets.channels.CHL_S2C},
	S2C_SET_ITEM_STACKS2:					{id: 0xFD, channel: Packets.channels.CHL_S2C},
	S2C_EXTENDED:							{id: 0xFE, channel: Packets.channels.CHL_S2C},
	S2C_BATCH:								{id: 0xFF, channel: Packets.channels.CHL_S2C},
	////////////////////////////////////	////////////////////////////////////
	S2C_SURRENDER_STATE:					{id: 0x10E, channel: Packets.channels.CHL_S2C},
	S2C_ON_ATTACK:							{id: 0x10F, channel: Packets.channels.CHL_S2C},
	S2C_CHAMPION_DEATH_TIMER:				{id: 0x117, channel: Packets.channels.CHL_S2C},
	S2C_SET_SPELL_ACTIVE_STATE:				{id: 0x118, channel: Packets.channels.CHL_S2C},
	S2C_RESOURCE_TYPE:						{id: 0x119, channel: Packets.channels.CHL_S2C},
	S2C_REPLACE_STORE_ITEM:					{id: 0x11C, channel: Packets.channels.CHL_S2C},
	S2C_CREATE_MONSTER_CAMP:				{id: 0x122, channel: Packets.channels.CHL_S2C},
	S2C_SPELL_EMPOWER:						{id: 0x125, channel: Packets.channels.CHL_S2C},
	S2C_NPC_DIE:							{id: 0x126, channel: Packets.channels.CHL_S2C},
	S2C_FLOATING_TEXT2:						{id: 0x128, channel: Packets.channels.CHL_S2C},
	S2C_FORCE_TARGET_SPELL:					{id: 0x129, channel: Packets.channels.CHL_S2C},
	S2C_MOVE_CHAMPION_CAMERA_CENTER:		{id: 0x12B, channel: Packets.channels.CHL_S2C}
};

Packets.ids = {};
for(var i in Packets.cmd)
	Packets.ids[Packets.cmd[i].id] = i;
//console.log(Packets.ids);

module.exports = Packets;