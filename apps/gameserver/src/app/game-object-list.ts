import type { NetId } from "@repo/packets/types/player";
import type GameObject from "../gameobjects/game-object";
import type Missile from "../gameobjects/missiles/missile";
import type Barrack from "../gameobjects/spawners/barrack";
import type Fountain from "../gameobjects/spawners/fountain";
import type AttackableUnit from "../gameobjects/units/attackable-unit";


export function arrayRemove<T>(arr: T[], value: T) {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

export function getPrototypeChainNames(obj: object) {
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
    static missiles: Missile[] = [];
    static barracks: Barrack[] = [];
    static fountains: Fountain[] = [];

    static objectByNetId: { [netId: NetId]: GameObject } = {};

    static add(object: GameObject) {
        this.objects.push(object);
        this.objectByNetId[object.netId] = object;

        const protos = getPrototypeChainNames(object);
        if (protos.includes('AttackableUnit')) {
            const o = object as AttackableUnit;
            this.attackableUnits.push(o);
        }

        if (protos.includes('Missile')) {
            const o = object as Missile;
            this.missiles.push(o);
        }

        if (protos.includes('Barrack')) {
            const o = object as Barrack;
            this.barracks.push(o);
        }

        if (protos.includes('Fountain')) {
            const o = object as Fountain;
            this.fountains.push(o);
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

        if (protos.includes('Missile')) {
            const o = object as Missile;
            arrayRemove(this.missiles, o);
        }

        if (protos.includes('Barrack')) {
            const o = object as Barrack;
            arrayRemove(this.barracks, o);
        }

        if (protos.includes('Fountain')) {
            const o = object as Fountain;
            arrayRemove(this.fountains, o);
        }
    }

    static get aliveUnits() {
        return this.attackableUnits.filter(unit => !unit.combat.died);
    }

    static unitByNetId(netId: NetId) {
        const object = this.objectByNetId[netId];

        if (!object)
            return;

        const protos = getPrototypeChainNames(object);
        if (!protos.includes('AttackableUnit'))
            return;

        const o = object as AttackableUnit;
        return o;
    }

}
