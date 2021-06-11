
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const CreateHeroDeath = {
    Alive: 0,
    Zombie: 1,
    Dead: 2
};

module.exports = function(q){
    console.log('handle: C2S_CHAR_LOADED');

    
    var S2C_START_SPAWN = createPacket('S2C_START_SPAWN');
    var isSent = sendPacket(S2C_START_SPAWN);
    
    var S2C_HERO_SPAWN = createPacket('S2C_HERO_SPAWN');
    S2C_HERO_SPAWN.packet.netId = 0x40000001;
    S2C_HERO_SPAWN.packet.NetID = 0x40000001;
    S2C_HERO_SPAWN.packet.ClientID = 1;
    S2C_HERO_SPAWN.packet.NetNodeID = 0x40;
    //S2C_HERO_SPAWN.packet.SenderNetID = 0x40000001;
    S2C_HERO_SPAWN.packet.SkinID = 0;
    S2C_HERO_SPAWN.packet.Name = 'Nautilus';
    S2C_HERO_SPAWN.packet.Skin = 'Nautilus';
    var bitfield1 = 0;
    //if(TeamIsOrder)
        bitfield1 |= 0x01;
    //if(IsBot)
    //    bitfield1 |= 0x02;
    S2C_HERO_SPAWN.packet.TeamIsOrder_IsBot_bitfield1 = bitfield1;
    S2C_HERO_SPAWN.packet.CreateHeroDeath = CreateHeroDeath.Alive;
    S2C_HERO_SPAWN.packet.SpawnPositionIndex = 2;
    var isSent = sendPacket(S2C_HERO_SPAWN);
    
    var S2C_AVATAR_INFO = createPacket('S2C_AVATAR_INFO');
    var isSent = sendPacket(S2C_AVATAR_INFO);
    
    var S2C_END_SPAWN = createPacket('S2C_END_SPAWN');
    var isSent = sendPacket(S2C_END_SPAWN);
    
    //var S2C_BUY_ITEM_ANS = createPacket('S2C_BUY_ITEM_ANS');
    //var isSent = sendPacket(S2C_BUY_ITEM_ANS);
    
};
