import { Vector2 } from '@repo/geometry';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import type AttackableUnit from '../gameobjects/units/attackable-unit';


type BasicAttackModelHelper = Partial<packets.Basic_AttackModel & packets.Basic_Attack_PosModel & {
    /** -1.28 to 1.27 */
    extraTimeS: number,
}>;

function beginAttackAns(caster: AttackableUnit, target: AttackableUnit, basicAttackInfo: BasicAttackModelHelper) {
    const targetPosition = {
        x: target.position.x,
        y: target.position.y,
        z: 10,
    };

    const packet1 = packets.Basic_Attack_Pos.create({
        netId: caster.netId,
        targetNetId: target.netId,
        targetPosition: targetPosition,
        missileNextId: GameObjectList.lastNetId + 1,
        position: {
            x: caster.position.x,
            y: caster.position.y,
        },
        ...basicAttackInfo,
    });

    return packet1;
}

function nextAttackAns(caster: AttackableUnit, target: AttackableUnit, basicAttackInfo: BasicAttackModelHelper) {
    const targetPosition = {
        x: target.position.x,
        y: target.position.y,
        z: 10,
    };

    const packet1 = packets.Basic_Attack.create({
        netId: caster.netId,
        targetNetId: target.netId,
        targetPosition: targetPosition,
        missileNextId: GameObjectList.lastNetId + 1,
        ...basicAttackInfo,
    });

    return packet1;
}

export function basicAttack(caster: AttackableUnit, target: AttackableUnit, basicAttackInfo: BasicAttackModelHelper, lastAttackPos: Vector2) {

    basicAttackInfo.extraTime = basicAttackInfo.extraTime ?? ((basicAttackInfo.extraTimeS! * 100) + 128);
    basicAttackInfo.extraTime = Math.min(basicAttackInfo.extraTime, 255);
    basicAttackInfo.extraTime = Math.max(basicAttackInfo.extraTime, 0);

    if (lastAttackPos.distanceTo(caster.position) > 0.1) {
        lastAttackPos.copy(caster.position);
        return beginAttackAns(caster, target, basicAttackInfo);
    }
    else {
        return nextAttackAns(caster, target, basicAttackInfo);
    }
}

export function sendBasicAttack(caster: AttackableUnit, target: AttackableUnit, basicAttackInfo: BasicAttackModelHelper, lastAttackPos: Vector2) {
    const packet = basicAttack(caster, target, basicAttackInfo, lastAttackPos);
    caster.packets.toVision(packet);
}

function stopAttackAns(caster: AttackableUnit, stopAttackInfo: Partial<packets.InstantStop_AttackModel>) {
    const packet1 = packets.InstantStop_Attack.create({
        netId: caster.netId,
        ...stopAttackInfo,
    });

    return packet1;
}

export function sendStopAttack(caster: AttackableUnit, stopAttackInfo: Partial<packets.InstantStop_AttackModel>) {
    const packet = stopAttackAns(caster, stopAttackInfo);
    caster.packets.toVision(packet);
}
