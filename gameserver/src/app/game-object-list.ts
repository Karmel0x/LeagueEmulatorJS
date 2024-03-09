import type { NetId } from "@workspace/packets/packages/packets/types/player";
import type GameObject from "../gameobjects/game-object";
import type Missile from "../gameobjects/missiles/missile";
import type Barrack from "../gameobjects/spawners/barrack";
import type AttackableUnit from "../gameobjects/units/attackable-unit";
import type Player from "../gameobjects/units/player";
import type Structure from "../gameobjects/units/structures/structure";


function arrayRemove<T>(arr: T[], value: T) {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function getPrototypeChainNames(obj: object) {
    const names = [];

    let proto = obj.constructor;
    while (proto && proto.name) {
        names.push(proto.name);
        proto = Object.getPrototypeOf(proto);
    }

    return names;
}

export default class GameObjectList {

    static lastNetId = 0x40000000;

    static objects: GameObject[] = [];
    static attackableUnits: AttackableUnit[] = [];
    static players: Player[] = [];
    static structures: Structure[] = [];
    static missiles: Missile[] = [];
    static barracks: Barrack[] = [];

    static objectByNetId: { [netId: NetId]: GameObject } = {};
    static playerByPeer: { [peerNum: number]: Player } = {};

    static add(object: GameObject) {
        this.objects.push(object);
        this.objectByNetId[object.netId] = object;

        const protos = getPrototypeChainNames(object);
        if (protos.includes('AttackableUnit')) {
            const o = object as AttackableUnit;
            this.attackableUnits.push(o);
        }

        if (protos.includes('Player')) {
            const o = object as Player;
            this.players.push(o);
        }

        if (protos.includes('Structure')) {
            const o = object as Structure;
            this.structures.push(o);
        }

        if (protos.includes('Missile')) {
            const o = object as Missile;
            this.missiles.push(o);
        }

        if (protos.includes('Barrack')) {
            const o = object as Barrack;
            this.barracks.push(o);
        }
    }

    static remove(object: GameObject) {
        arrayRemove(this.objects, object);
        delete this.objectByNetId[object.netId];

        const protos = getPrototypeChainNames(object);
        if (protos.includes('AttackableUnit')) {
            const o = object as AttackableUnit;
            arrayRemove(this.attackableUnits, o);
        }

        if (protos.includes('Player')) {
            const o = object as Player;
            arrayRemove(this.players, o);
        }

        if (protos.includes('Structure')) {
            const o = object as Structure;
            arrayRemove(this.structures, o);
        }

        if (protos.includes('Missile')) {
            const o = object as Missile;
            arrayRemove(this.missiles, o);
        }

        if (protos.includes('Barrack')) {
            const o = object as Barrack;
            arrayRemove(this.barracks, o);
        }
    }

    static get aliveUnits() {
        return this.attackableUnits.filter(unit => !unit.combat.died);
    }

    static unitByNetId(netId: NetId) {
        const object = this.objectByNetId[netId];

        if (!object)
            return undefined;

        const protos = getPrototypeChainNames(object);
        if (!protos.includes('AttackableUnit'))
            return undefined;

        const o = object as AttackableUnit;
        return o;
    }

}
