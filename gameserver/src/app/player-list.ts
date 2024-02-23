
import type Player from '../gameobjects/units/player';


export default class PlayerList {
    static list: Player[] = [];
    static peers: { [peerId: number]: number } = {};
}
