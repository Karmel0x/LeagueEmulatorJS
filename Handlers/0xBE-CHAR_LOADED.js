
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const CreateHeroDeath = {
    Alive: 0,
    Zombie: 1,
    Dead: 2
};

module.exports = function(q, obj1){
    console.log('handle: C2S.CHAR_LOADED');
	//console.log(obj1);

    
    var START_SPAWN = createPacket('START_SPAWN');
    var isSent = sendPacket(START_SPAWN);
    
    var HERO_SPAWN = createPacket('HERO_SPAWN');
    //HERO_SPAWN.netId = global.Players[0].netId;
    HERO_SPAWN.NetID = global.Players[0].netId;
    HERO_SPAWN.ClientID = 0;
    HERO_SPAWN.NetNodeID = 0;//0x40;
    //HERO_SPAWN.SenderNetID = global.Players[0].netId;
    HERO_SPAWN.SkinID = 0;
    HERO_SPAWN.Name = 'Test';//playerName
    HERO_SPAWN.Skin = 'Ezreal';//modelName
    var bitfield1 = 0;
    //if(TeamIsOrder)
        bitfield1 |= 0x01;
    //if(IsBot)
    //    bitfield1 |= 0x02;
    HERO_SPAWN.TeamIsOrder_IsBot_bitfield1 = bitfield1;
    HERO_SPAWN.CreateHeroDeath = CreateHeroDeath.Alive;
    HERO_SPAWN.SpawnPositionIndex = 0;//2;
    var isSent = sendPacket(HERO_SPAWN);
    
    var AVATAR_INFO = createPacket('AVATAR_INFO');
    AVATAR_INFO.netId = global.Players[0].netId;
    AVATAR_INFO.ItemIDs = [
        0,
        0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d, 0x147d,
        0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5, 0x14c5,
        0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9, 0x14a9,
        0x14d7, 0x14d7
    ];
    AVATAR_INFO.SummonerIDs = [0x0364af1c, 0x06496ea8];
    AVATAR_INFO.SummonerIDs2 = AVATAR_INFO.SummonerIDs;
    
    var isSent = sendPacket(AVATAR_INFO);
    // -----
    var turrets = [
        0xffd23c3e,
        0xff4a20f1,
        0xff9303e1,
        0xff6793d0,
        0xffff8f1f,
        0xff26ac0f,
        0xfff97db5,
        0xfff02c0f,
        0xff10c6db,
    ];
    
    for(let i = 0; i < turrets.length; i++){
	    var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
        OBJECT_SPAWN.netId = turrets[i];
        OBJECT_SPAWN.isTurret = true;
	    var isSent = sendPacket(OBJECT_SPAWN);
    }

    //var SKILL_UP = createPacket('SKILL_UP');
    //SKILL_UP.Slot = 13;
	//SKILL_UP.SpellLevel = 1;
	//SKILL_UP.SkillPoints = 1;
    //var isSent = sendPacket(SKILL_UP);

    
    // -----
    var END_SPAWN = createPacket('END_SPAWN');
    var isSent = sendPacket(END_SPAWN);
    
    //var BUY_ITEM_ANS = createPacket('BUY_ITEM_ANS');
    //var isSent = sendPacket(BUY_ITEM_ANS);
    
};
