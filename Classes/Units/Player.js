var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");
const loadingStages = require('../../Constants/loadingStages');
const playersConfig = require('../../Constants/playersConfig');


class Player extends Unit {
    KillDeathCounter = 0;
    loaded = false;

    constructor(team, num = 0, config = {}){
        var character = config.champion;
        
        //config.netId = 0x400005ed;
        config.info = config.info || {};
        config.info.spawnNum = 5;
        config.loadingStage = 0;

        super(team, num, character, config);
        
        const Champion_ = require('../../Champions/' + character);
        this.champion = new Champion_(this);
    }
    sendPacket(packet, minStage = loadingStages.NOT_CONNECTED){
        if(this.loadingStage < minStage)
            return;
        
        sendPacket(this.peer_num, packet);
    }
    //vision(target, enters = true){
    //    if(!this.loaded)
    //        return;
//
    //    //console.log('vision', target, see);
    //    if(enters){
    //        console.log('enters vision', this.netId, target.netId);
//
    //        var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
    //        OBJECT_SPAWN.netId = target.netId;
    //        OBJECT_SPAWN.ShieldValues = {
    //            Magical: 0,
    //            Physical: 0,
    //            MagicalAndPhysical: 0,
    //        };
    //        OBJECT_SPAWN.LookAtPosition = {x: 1, y: 0, z: 0};
    //        OBJECT_SPAWN.CharacterStackData = [
    //            {
    //                SkinName: target.model
    //            }
    //        ];
    //        OBJECT_SPAWN.MovementData = {
    //            //SyncID: 0x0F0FD189,
    //            Position: target.transform.position,
    //            Forward: {x: 0, y: 0},
    //        };
    //        var isSent = this.sendPacket(OBJECT_SPAWN);
    //    }else{
    //        console.log('leaves vision', this.netId, target.netId);
//
    //        var LEAVE_VISION = createPacket('LEAVE_VISION');
    //        LEAVE_VISION.netId = target.netId;
    //        var isSent = this.sendPacket(LEAVE_VISION);
    //    }
//
    //}
    SET_HEALTH(){
    }
    SET_COOLDOWN(Slot){return;
        var SET_COOLDOWN = createPacket('SET_COOLDOWN', 'S2C');
        SET_COOLDOWN.netId = this.netId;
        SET_COOLDOWN.Slot = Slot;
        SET_COOLDOWN.bitfield = {
            PlayVOWhenCooldownReady: false,
            IsSummonerSpell: false,
        };
        SET_COOLDOWN.Cooldown = 0;
        SET_COOLDOWN.MaxCooldownForDisplay = 0;
        var isSent = this.sendPacket(SET_COOLDOWN);
        console.log(SET_COOLDOWN);
    }
    castSpellAns(CastInfo){

        var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
        CAST_SPELL_ANS.netId = this.netId;
        CAST_SPELL_ANS.CasterPositionSyncID = performance.now();
        CAST_SPELL_ANS.CastInfo = {
            SpellHash: 0,
            SpellNetID: 1073743439,
            SpellLevel: 1,
            AttackSpeedModifier: 1,
            CasterNetID: this.netId,
            SpellChainOwnerNetID: this.netId,
            PackageHash: this.champion.PackageHash,
            MissileNetID: 1073743440,
            TargetPosition: {},
            TargetPositionEnd: {},
            DesignerCastTime: 0.25,
            DesignerTotalTime: 0.25,
            ManaCost: 28,
            SpellCastLaunchPosition: {},
            AmmoUsed: 1,
            target: [{
                unit: 0,
                hitResult: 0,
            }],
        };
        Object.assign(CAST_SPELL_ANS.CastInfo, CastInfo);

        CAST_SPELL_ANS.CastInfo.targetCount = CAST_SPELL_ANS.CastInfo.target.length;
        CAST_SPELL_ANS.CastInfo.size = 102 + CAST_SPELL_ANS.CastInfo.targetCount * 5;
        var isSent = this.sendPacket(CAST_SPELL_ANS);
        console.log(CAST_SPELL_ANS);
    }
    castSpell(packet){
        if(typeof this.champion.spells[packet.Slot] == 'undefined')
            return console.log('wrong spell slot', packet.Slot);

        this.champion.spells[packet.Slot].cast(packet);
    }
    AddParticleTarget(EffectNameHash, BoneNameHash){return;
        var SPAWN_PARTICLE = createPacket('SPAWN_PARTICLE', 'S2C');
        SPAWN_PARTICLE.netId = 0;//this.netId;
        SPAWN_PARTICLE.FXCreateGroupData = [];
        SPAWN_PARTICLE.FXCreateGroupData[0] = {
            PackageHash: this.champion.PackageHash,
            EffectNameHash: EffectNameHash,
            Flags: 32,
            TargetBoneNameHash: 0,
            BoneNameHash: BoneNameHash,
        };
        SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData = [];
        SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0] = {
            TargetNetID: this.netId,
            NetAssignedNetID: this.netId,
            CasterNetID: this.netId,
            BindNetID: this.netId,
            KeywordNetID: this.netId,
            TimeSpent: 0,
            ScriptScale: 1,
        };
        SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].Position = {
            x: player.transform.position.x,
            y: player.transform.position.y,
            z: 180,
        };
        SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].TargetPosition = {
            x: player.transform.position.x,
            y: player.transform.position.y,
            z: 180,
        };
        SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].OwnerPosition = {
            x: player.transform.position.x,
            y: player.transform.position.y,
            z: 180,
        };
        SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData[0].OrientationVector = {
            x: 0,
            y: 0,
            z: 0,
        };

        SPAWN_PARTICLE.FXCreateGroupData[0].count = SPAWN_PARTICLE.FXCreateGroupData[0].FXCreateData.length;
        SPAWN_PARTICLE.count = SPAWN_PARTICLE.FXCreateGroupData.length;
        var isSent = this.sendPacket(SPAWN_PARTICLE);
        console.log(SPAWN_PARTICLE);
    }
}


module.exports = Player;
