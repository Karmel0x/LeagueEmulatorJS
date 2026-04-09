
import type Network from '@repo/network/network';
import TranslateCenteredCoordinates, { TranslateCenteredCoordinatesV3 } from '@repo/packets/functions/translate-centered-coordinates';
import { loadLevel } from '@repo/scripting/load/level';
import GameLoop from '../core/game-loop';
import type MovementSimulation from '../game/components/movement-simulation';
import config from '../game/game.config';
import type Game from '../game/initializers/game';
import type Teams from '../game/initializers/teams';
import type AttackableUnit from '../gameobjects/units/attackable-unit';

export default class Server {
    static network: Network;
    static gameLoop = new GameLoop();
    static movement: MovementSimulation;
    static map = loadLevel(`${config.game.map}`);

    static debug = true;
    static commandStartGame = !config.testing.enabled || !config.testing.noAutoGameStart;
    static packetLengthWarning = 1000;
    static lastSelectedNetId = 0;

    static syncId = 0;
    static teams: { [name: string]: Teams } = {};
    static game: Game;
    static players: AttackableUnit[] = [];

}

TranslateCenteredCoordinates.middleOfMap = Server.map.middleOfMap;
TranslateCenteredCoordinatesV3.middleOfMap = Server.map.middleOfMap;
Server.gameLoop.start();
