import type { NetId } from "@repo/packets/types/player";
import type { Hero, Inhibitor } from "../gameobjects/unit-ai";
import type BaseAi from "../gameobjects/unit-ai/base-ai";
import type Player from "../gameobjects/unit-ai/player";
import type Structure from "../gameobjects/unit-ai/structures/structure";
import { arrayRemove, getPrototypeChainNames } from "./game-object-list";


export default class UnitAiList {

    static objects: BaseAi[] = [];
    static heroes: Hero[] = [];
    static players: Player[] = [];
    static structures: Structure[] = [];
    static inhibitors: Inhibitor[] = [];

    static objectByNetId: { [netId: NetId]: BaseAi } = {};
    static playerByPeer: { [peerNum: number]: Player } = {};

    static add(object: BaseAi) {
        const owner = object.owner;

        this.objects.push(object);
        this.objectByNetId[owner.netId] = object;

        const protos = getPrototypeChainNames(object);

        if (protos.includes('Hero')) {
            const o = object as Hero;
            this.heroes.push(o);
        }

        if (protos.includes('Player')) {
            const o = object as Player;
            this.players.push(o);
        }

        if (protos.includes('Structure')) {
            const o = object as Structure;
            this.structures.push(o);
        }

        if (protos.includes('Inhibitor')) {
            const o = object as Inhibitor;
            this.inhibitors.push(o);
        }
    }

    static remove(object: BaseAi) {
        const owner = object.owner;

        arrayRemove(this.objects, object);
        delete this.objectByNetId[owner.netId];

        const protos = getPrototypeChainNames(object);

        if (protos.includes('Hero')) {
            const o = object as Hero;
            arrayRemove(this.heroes, o);
        }

        if (protos.includes('Player')) {
            const o = object as Player;
            arrayRemove(this.players, o);
        }

        if (protos.includes('Structure')) {
            const o = object as Structure;
            arrayRemove(this.structures, o);
        }

        if (protos.includes('Inhibitor')) {
            const o = object as Inhibitor;
            arrayRemove(this.inhibitors, o);
        }
    }

    static unitByNetId(netId: NetId) {
        const object = this.objectByNetId[netId];

        if (!object)
            return;

        const protos = getPrototypeChainNames(object);
        if (!protos.includes('BaseAi'))
            return;

        const o = object as BaseAi;
        return o;
    }

}
