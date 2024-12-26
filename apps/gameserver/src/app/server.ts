
import Network from '@repo/network/network';
import MovementSimulation from '../game/components/movement-simulation';
import Teams from '../game/initializers/teams';
import SummonersRift from '@repo/gamedata/maps/summoners-rift';

export default class Server {
    static network: Network;
    static movement: MovementSimulation;
    static map = SummonersRift;

    static commandStartGame = false;
    static useTerrainEscape = false;
    static doNotUsePathfinding = false;
    static packetLengthWarning = 1000;

    static teams: { [name: string]: Teams } = {};

    static game = {
        initialized: 0,
        loaded: 0,
        started: 0,
        paused: false,
    };

}
