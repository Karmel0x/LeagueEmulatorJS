
import SummonersRift from '@repo/gamedata/maps/map1/general';
import type Network from '@repo/network/network';
import TranslateCenteredCoordinates, { TranslateCenteredCoordinatesV3 } from '@repo/packets/functions/translate-centered-coordinates';
import type MovementSimulation from '../game/components/movement-simulation';
import type Game from '../game/initializers/game';
import type Teams from '../game/initializers/teams';
import type AttackableUnit from '../gameobjects/units/attackable-unit';

export default class Server {
    static network: Network;
    static movement: MovementSimulation;
    static map = SummonersRift;

    static debug = true;
    static commandStartGame = false;
    static packetLengthWarning = 1000;

    static useTerrainEscape = false;
    static usePathFinding = false;

    static teams: { [name: string]: Teams } = {};
    static game: Game;
    static players: AttackableUnit[] = [];

}

TranslateCenteredCoordinates.middleOfMap = Server.map.middleOfMap;
TranslateCenteredCoordinatesV3.middleOfMap = Server.map.middleOfMap;
