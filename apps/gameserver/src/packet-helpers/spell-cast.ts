import { Vector2WithZ } from '@repo/geometry';
import HashString from '@repo/packets/functions/hash-string';
import * as packets from '@repo/packets/list';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import type { Player } from '../gameobjects/unit-ai';
import { AiType } from '../gameobjects/unit-ai/base-ai';
import type AttackableUnit from '../gameobjects/units/attackable-unit';


type SCastInfoModelHelper = Partial<Omit<SCastInfoModel, 'spellHash'> & {
    spellHash: number | string,
}>;

export function makeCastInfo(caster: AttackableUnit, castInfo1: Partial<SCastInfoModelHelper> = {}) {

    let spellHash = castInfo1.spellHash;
    if (typeof spellHash === 'string') {
        spellHash = HashString.HashString(spellHash);
    }

    const castInfo: SCastInfoModel = {
        castNetId: 0,
        spellLevel: 0,
        attackSpeedModifier: 1,
        casterNetId: caster.netId,
        spellChainOwnerNetId: caster.netId,
        packageHash: 0,
        missileNetId: 0,
        targetPosition: { x: 0, y: 0, z: 0 },
        targetPositionEnd: { x: 0, y: 0, z: 0 },
        targets: [],
        designerCastTime: 0.25,
        extraCastTime: 0,
        designerTotalTime: 1,
        cooldown: 0,
        startCastTime: 0,
        isAutoAttack: false,
        isSecondAutoAttack: false,
        isForceCastingOrChannel: false,
        isOverrideCastPosition: false,
        isClickCasted: false,
        spellSlot: 0,
        manaCost: 0,
        spellCastLaunchPosition: {
            x: caster.position.x,
            y: caster.position.y,
            z: 60,
        },
        ammoUsed: 0,
        ammoRechargeTime: 0,
        ...castInfo1,
        spellHash: spellHash || 0,
    };

    if (caster.ai && caster.ai.type === AiType.Hero) {
        (caster.ai as Player).packets.chatBoxDebugMessage('caster.position', {
            x: Math.round(caster.position.x * 1e3) / 1e3,
            y: Math.round(caster.position.y * 1e3) / 1e3,
        });
    }

    return castInfo;
}

export function spellCast(caster: AttackableUnit, castInfo1: Partial<SCastInfoModelHelper> = {}) {

    const castInfo = makeCastInfo(caster, castInfo1);

    const packet1 = packets.CastSpellAns.create({
        netId: caster.netId,
        casterPositionSyncId: performance.now(), //
        castInfo: castInfo,
    });

    return packet1;
}

export function sendSpellCast(caster: AttackableUnit, castInfo: Partial<SCastInfoModelHelper> = {}) {
    const packet = spellCast(caster, castInfo);
    caster.packets.toVision(packet);
}

export function missileReplication(caster: AttackableUnit, castInfo1: Partial<SCastInfoModelHelper> = {}, missileData: Partial<packets.MissileReplicationModel> = {}) {

    const castInfo = makeCastInfo(caster, castInfo1);

    let velocity = missileData.velocity;
    if (!velocity && missileData.direction && missileData.speed) {
        velocity = Vector2WithZ.from(missileData.direction).clone().multiplyScalar(missileData.speed);
    }

    const packet1 = packets.MissileReplication.create({
        netId: caster.netId,
        //position: SVector3Model,
        casterPosition: caster.position,
        //direction: SVector3Model,
        velocity,
        //startPoint: SVector3Model,
        //endPoint: SVector3Model,
        //unitPosition: SVector3Model,
        //speed: number,
        //lifePercentage: number,
        //bounced: boolean,
        ...missileData,
        castInfo: castInfo,
    });

    return packet1;
}

export function sendMissileReplication(caster: AttackableUnit, castInfo: Partial<SCastInfoModelHelper> = {}, missileData: Partial<packets.MissileReplicationModel> = {}) {
    const packet = missileReplication(caster, castInfo, missileData);
    caster.packets.toVision(packet);
}
