
import Logging from '../core/Logging';
import Network from '../core/network/Network';
import Teams from '../game/initializers/Teams';
import BasePacket from '../packets/BasePacket';
import MovementSimulation from '../game/components/MovementSimulation';
import Player from '../gameobjects/units/Player';

export default class Server {
    static logging: Logging;
    static network: Network;
    static packets: { [channelId: number]: { [packetId: number]: typeof BasePacket } } = {};
    static movement: MovementSimulation;

    static command_START_GAME = false;
    static useTerrainEscape = false;
    static doNotUsePathfinding = false;
    static packetLengthWarning = 1000;

    static playerPeers: { [peerId: number]: number } = {};
    static teams: { [name: string]: Teams } = {};

    static game = {
        initialized: 0,
        loaded: 0,
        started: 0,
    };

    static players: Player[] = [];
}
