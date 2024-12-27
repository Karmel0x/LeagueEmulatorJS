import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import HashString from '@repo/packets/functions/hash-string';
import * as packets from '@repo/packets/list';
import type AttackableUnit from '../gameobjects/units/attackable-unit';


type BuffAdd2ModelHelper = Partial<Omit<packets.BuffAdd2Model, 'nameHash'> & {
    nameHash: number | string,
}>;

type BuffRemove2ModelHelper = Partial<Omit<packets.BuffRemove2Model, 'nameHash'> & {
    nameHash: number | string,
}>;

let slotNumTest = 0;

export function buffAdd(target: AttackableUnit, buffInfo1: Partial<BuffAdd2ModelHelper> = {}) {

    let nameHash = buffInfo1.nameHash;
    if (typeof nameHash === 'string') {
        nameHash = HashString.HashString(nameHash);
    }

    const buffInfo: packets.BuffAdd2Model = {
        slot: ++slotNumTest % 32,
        type: BuffType.internal,
        count: 1,
        isHidden: 0,
        runningTime: 0,
        duration: 0,
        casterNetId: target.netId,
        packageHash: 0,
        ...buffInfo1,
        nameHash: nameHash || 0,
    };

    const packet1 = packets.BuffAdd2.create({
        netId: target.netId,
        ...buffInfo,
    });

    return packet1;
}

export function sendBuffAdd(target: AttackableUnit, castInfo: Partial<BuffAdd2ModelHelper> = {}) {
    const packet = buffAdd(target, castInfo);
    target.packets.toVision(packet);
}

export function buffRemove(target: AttackableUnit, buffInfo1: Partial<BuffRemove2ModelHelper> = {}) {

    let nameHash = buffInfo1.nameHash;
    if (typeof nameHash === 'string') {
        nameHash = HashString.HashString(nameHash);
    }

    const packet1 = packets.BuffRemove2.create({
        netId: target.netId,
        ...buffInfo1,
        nameHash,
    });

    return packet1;
}

export function sendBuffRemove(target: AttackableUnit, castInfo: Partial<BuffAdd2ModelHelper> = {}) {
    const packet = buffRemove(target, castInfo);
    target.packets.toVision(packet);
}

export function buffReplace(target: AttackableUnit, buffInfo1: Partial<packets.BuffReplaceModel> = {}) {

    const packet1 = packets.BuffReplace.create({
        netId: target.netId,
        ...buffInfo1,
    });

    return packet1;
}

export function sendBuffReplace(target: AttackableUnit, castInfo: Partial<packets.BuffReplaceModel> = {}) {
    const packet = buffRemove(target, castInfo);
    target.packets.toVision(packet);
}
