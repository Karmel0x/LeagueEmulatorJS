import * as packets from '@repo/packets/list';
import type { CMovementDataNormalModel } from '@repo/packets/shared/CMovementDataNormal';
import type { CMovementDataWithSpeedModel } from '@repo/packets/shared/CMovementDataWithSpeed';
import Server from '../app/server';
import loadingStages from '../constants/game-state';
import { TeamId } from '../gameobjectextensions/traits/team';
import type AttackableUnit from '../gameobjects/units/attackable-unit';


function createForced(units: AttackableUnit[]) {
    const movementData = units.map((unit) => {
        const unitWaypointsForced = unit.moving.waypointsForced;
        const waypoints = [unit.position, ...unitWaypointsForced];
        const data = {
            teleportNetId: unit.netId,
            teleportId: 0,
            waypoints,
            speedParams: unit.moving.speedParams,
        } satisfies CMovementDataWithSpeedModel;
        return data;
    });

    return packets.WaypointGroupWithSpeed.create({
        syncId: ++Server.syncId,
        movementData,
    });
}

function createNormal(units: AttackableUnit[]) {
    const movementData = units.map((unit, i) => {
        const unitWaypoints = unit.moving.waypoints;
        const waypoints = [unit.position, ...unitWaypoints];
        const data = {
            teleportNetId: unit.netId,
            teleportId: /*waypoints.length === 1 ? unit.moving.getNextTeleportId() :*/ 0,
            waypoints: waypoints.slice(0, 10),
        } satisfies CMovementDataNormalModel;
        return data;
    });

    return packets.WaypointGroup.create({
        syncId: ++Server.syncId,
        movementData,
    });
}

export function sendUnitsMoveForced(units: AttackableUnit[]) {
    const teamIds = [
        TeamId.chaos,
        TeamId.order,
    ];

    for (let i = 0; i < teamIds.length; i++) {
        const teamId = teamIds[i]!;
        const team = Server.teams[teamId];
        if (!team)
            continue;

        const seenNotAllyUnits = Server.movement.lastSeenUnitsByTeam[teamId] || new Set();
        const unitsToSend = units.filter(unit => unit.team.id === teamId || seenNotAllyUnits.has(unit));
        if (unitsToSend.length < 1)
            continue;

        const packet1 = createForced(unitsToSend);
        team.sendPacket(packet1, loadingStages.inGame);
    }
}

export function sendUnitsMoveNormal(units: AttackableUnit[]) {
    const teamIds = [
        TeamId.chaos,
        TeamId.order,
    ];

    for (let i = 0; i < teamIds.length; i++) {
        const teamId = teamIds[i]!;
        const team = Server.teams[teamId];
        if (!team)
            continue;

        const seenNotAllyUnits = Server.movement.lastSeenUnitsByTeam[teamId] || new Set();
        const unitsToSend = units.filter(unit => unit.team.id === teamId || seenNotAllyUnits.has(unit));
        if (unitsToSend.length < 1)
            continue;

        //const packet1 = createNormal(unitsToSend);
        //team.sendPacket(packet1, loadingStages.inGame);

        while (unitsToSend.length > 0) {
            const chunk = unitsToSend.splice(0, 1);
            const packet1 = createNormal(chunk);
            team.sendPacket(packet1, loadingStages.inGame);
        }
    }

    //while (units.length > 0) {
    //    const chunk = units.splice(0, 16);
    //    const packet1 = createNormal(chunk, withNextTeleport);
    //    Server.teams[TeamId.all]!.sendPacket(packet1, loadingStages.inGame);
    //}
}

export function sendUnitsMove(units: AttackableUnit[]) {
    if (units.length < 1)
        return;

    const units1 = units.filter(unit => unit.moving.waypointsForced.length > 0);
    if (units1.length > 0)
        sendUnitsMoveForced(units1);

    const units2 = units.filter(unit => !units1.includes(unit));
    if (units2.length > 0)
        sendUnitsMoveNormal(units2);
}
