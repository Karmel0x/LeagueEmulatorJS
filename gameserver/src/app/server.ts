
import Network from '@workspace/network/packages/network/network';
import MovementSimulation from '../game/components/movement-simulation';
import Teams from '../game/initializers/teams';

export default class Server {
    static network: Network;
    static movement: MovementSimulation;

    static command_START_GAME = false;
    static useTerrainEscape = false;
    static doNotUsePathfinding = false;
    static packetLengthWarning = 1000;

    static teams: { [name: string]: Teams } = {};

    static game = {
        initialized: 0,
        loaded: 0,
        started: 0,
    };

}
