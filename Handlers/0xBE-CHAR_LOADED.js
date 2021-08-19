
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
const loadingStages = require("../Constants/loadingStages");

const Inhibitor = require("../Classes/Units/Inhibitor");
const Nexus = require("../Classes/Units/Nexus");
const Turret = require("../Classes/Units/Turret");

const CreateHeroDeath = {
    Alive: 0,
    Zombie: 1,
    Dead: 2
};

module.exports = (player, packet) => {
    console.log('handle: C2S.CHAR_LOADED');
	//console.log(packet);

    
    var START_SPAWN = createPacket('START_SPAWN');
    var isSent = player.sendPacket(START_SPAWN, loadingStages.NOT_CONNECTED);
    
    var HERO_SPAWN = createPacket('HERO_SPAWN');
    //HERO_SPAWN.netId = player.netId;
    HERO_SPAWN.NetID = player.netId;
    HERO_SPAWN.ClientID = 0;
    HERO_SPAWN.NetNodeID = 0;//0x40;
    //HERO_SPAWN.SenderNetID = player.netId;
    HERO_SPAWN.SkinID = 0;
    HERO_SPAWN.Name = 'Test';//playerName
    HERO_SPAWN.Skin = global.Units['ALL'].Player[0].champion.name;//modelName

    HERO_SPAWN.bitfield = {
        TeamIsOrder: true,
        IsBot: false
    };
    HERO_SPAWN.CreateHeroDeath = CreateHeroDeath.Alive;
    HERO_SPAWN.SpawnPositionIndex = 0;//2;
    var isSent = player.sendPacket(HERO_SPAWN, loadingStages.NOT_CONNECTED);
    
    var AVATAR_INFO = createPacket('AVATAR_INFO');
    AVATAR_INFO.netId = player.netId;
    AVATAR_INFO.ItemIDs = [
        0,
        0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d,
        0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5,
        0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9,
        0x14d7, 0x14d7
    ];
    AVATAR_INFO.SummonerIDs = [0x0364af1c, 0x06496ea8];
    AVATAR_INFO.SummonerIDs2 = AVATAR_INFO.SummonerIDs;
    
    var isSent = player.sendPacket(AVATAR_INFO, loadingStages.NOT_CONNECTED);
    // -----
    
    Nexus.spawnAll();
    Inhibitor.spawnAll();
    Turret.spawnAll();


    //var SKILL_UP = createPacket('SKILL_UP');
    //SKILL_UP.Slot = 13;
	//SKILL_UP.SpellLevel = 1;
	//SKILL_UP.SkillPoints = 1;
    //var isSent = player.sendPacket(SKILL_UP);

    
    // -----
    var END_SPAWN = createPacket('END_SPAWN');
    var isSent = player.sendPacket(END_SPAWN, loadingStages.NOT_CONNECTED);
    
    //var BUY_ITEM_ANS = createPacket('BUY_ITEM_ANS');
    //var isSent = player.sendPacket(BUY_ITEM_ANS);
    
};
