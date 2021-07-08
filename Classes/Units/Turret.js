var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");

const TurretNetIds = {
    BLUE: {
        Turret_T1_R_03_A: 0x40000001,
        Turret_T1_R_02_A: 0x40000002,
        Turret_T1_C_07_A: 0x40000003,

        Turret_T1_C_05_A: 0x40000007,
        Turret_T1_C_04_A: 0x40000008,
        Turret_T1_C_03_A: 0x40000009,
        Turret_T1_C_01_A: 0x4000000a,
        Turret_T1_C_02_A: 0x4000000b,

        Turret_OrderTurretShrine_A: 0x40000011,
            
        Turret_T1_L_03_A: 0x40000013,
        Turret_T1_L_02_A: 0x40000014,
        Turret_T1_C_06_A: 0x40000015,
    },
    RED: {
        Turret_T2_R_03_A: 0x40000004,
        Turret_T2_R_02_A: 0x40000005,
        Turret_T2_R_01_A: 0x40000006,

        Turret_T2_C_05_A: 0x4000000c,
        Turret_T2_C_04_A: 0x4000000d,
        Turret_T2_C_03_A: 0x4000000e,
        Turret_T2_C_01_A: 0x4000000f,
        Turret_T2_C_02_A: 0x40000010,

        Turret_ChaosTurretShrine_A: 0x40000012,

        Turret_T2_L_03_A: 0x40000016,
        Turret_T2_L_02_A: 0x40000017,
        Turret_T2_L_01_A: 0x40000018,
    }
};


global.Turrets = global.Turrets || {BLUE: {}, RED: {}};

class Turret extends Unit {
    constructor(config, team, num){
        super('TURRET', config, team, num);
        global.Turrets[team][num] = this;

        //this.netId = TurretNetIds[team][num] || 0x00;
        this.Name = config.Name;

        this.spawn();
    }
    spawn(){
        
        var TURRET_SPAWN = createPacket('TURRET_SPAWN', 'S2C');
        TURRET_SPAWN.netId = this.netId;
        TURRET_SPAWN.NetID = this.netId;
        TURRET_SPAWN.NetNodeID = 0x40;
        TURRET_SPAWN.Name = this.Name;
        TURRET_SPAWN.bitfield = {
            IsTargetable: true,
        };
        TURRET_SPAWN.IsTargetableToTeamSpellFlags = 0x01800000;
        var isSent = global.Teams.ALL.sendPacket(TURRET_SPAWN);


        super.spawn();
    }
    static spawnAll(){
        //return;
        for(let team in TurretNetIds)
            for(let name in TurretNetIds[team])
                new Turret({Name: name}, team, TurretNetIds[team][name]);

    }
}


module.exports = Turret;
