import type { Vector2Like } from '@repo/geometry';
import type { Vector2WithZLike } from '@repo/geometry/vector2-with-z';
import type { FXCreateDataModel, FXCreateGroupDataModel } from '@repo/packets/base/s2c/0x87-FX_Create_Group';
import HashString from '@repo/packets/functions/hash-string';
import TranslateCenteredCoordinates, { TranslateCenteredCoordinatesV3 } from '@repo/packets/functions/translate-centered-coordinates';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import type AttackableUnit from '../gameobjects/units/attackable-unit';


type FXCreateDataModelHelper = Partial<FXCreateDataModel & {
    positionNCC: Vector2Like | Vector2WithZLike,
    ownerPositionNCC: Vector2Like | Vector2WithZLike,
    targetPositionNCC: Vector2Like | Vector2WithZLike,
    //orientTowards: AttackableUnit | Vector2,
}>;

type FXCreateGroupDataModelHelper = Partial<Omit<FXCreateGroupDataModel, 'effectNameHash' | 'boneNameHash' | 'targetBoneNameHash' | 'createData'> & {
    effectNameHash: number | string,
    boneNameHash: number | string,
    targetBoneNameHash: number | string,
    createData: FXCreateDataModelHelper[],
}>;

export function spellEffectCreate(bindObj: AttackableUnit, fxCreateGroupDataH: FXCreateGroupDataModelHelper[]) {

    const groupData = fxCreateGroupDataH.map((groupDataH) => {
        let { effectNameHash, boneNameHash, targetBoneNameHash, createData: createDataH } = groupDataH;

        if (effectNameHash && typeof effectNameHash === 'string') {
            const effectName = effectNameHash.split('.')[0]!;
            effectNameHash = HashString.HashString2(effectName);
        }

        if (boneNameHash && typeof boneNameHash === 'string') {
            boneNameHash = HashString.HashString(boneNameHash);
        }

        if (targetBoneNameHash && typeof targetBoneNameHash === 'string') {
            targetBoneNameHash = HashString.HashString(targetBoneNameHash);
        }

        const createData = createDataH!.map((createDataH) => {
            const position = createDataH.position ?? TranslateCenteredCoordinatesV3.to([createDataH.positionNCC!])[0];
            const ownerPosition = createDataH.ownerPosition ?? TranslateCenteredCoordinates.to([createDataH.ownerPositionNCC!])[0];
            const targetPosition = createDataH.targetPosition ?? TranslateCenteredCoordinates.to([createDataH.targetPositionNCC!])[0];

            //let orientationVector = createDataH.orientationVector;
            //if (!orientationVector) {
            //    let orientTowards = createDataH.orientTowards;
            //    if (orientTowards) {
            //        if (!(orientTowards instanceof Vector2))
            //            orientTowards = orientTowards.position;
            //
            //        orientationVector = orientTowards.clone().sub(createDataH.positionNCC ?? new Vector2WithZ()).normalize();
            //    }
            //}

            const netAssignedNetId = createDataH.netAssignedNetId || ++GameObjectList.lastNetId;

            return {
                bindNetId: bindObj.netId,
                ...createDataH,
                position,
                ownerPosition,
                targetPosition,
                //orientationVector,
                netAssignedNetId,
            } as FXCreateDataModel;
        });

        return {
            ...groupDataH,
            effectNameHash,
            boneNameHash,
            targetBoneNameHash,
            createData,
        } as FXCreateGroupDataModel;
    });

    const packet = packets.FX_Create_Group.create({
        netId: 0,
        groupData,
    });

    return {
        packet,
        effectIds: groupData.map((groupData) => groupData.createData.map((createData) => createData.netAssignedNetId)),
    };
}

export function sendUnitParticle(bindObj: AttackableUnit, fxCreateGroupDataH: FXCreateGroupDataModelHelper[]) {
    const fxCreateGroup = spellEffectCreate(bindObj, fxCreateGroupDataH);
    bindObj.packets.toVision(fxCreateGroup.packet);
    return fxCreateGroup.effectIds;
}

export function spellEffectRemove(effectId: number) {
    const packet = packets.FX_Kill.create({
        netId: 0,
        objectNetId: effectId,
    });

    return packet;
}

export function sendUnitParticleRemove(owner: AttackableUnit, effectId: number) {
    const packet = spellEffectRemove(effectId);
    //TODO: should send where previous sent?
    owner.packets.toVision(packet);
}
