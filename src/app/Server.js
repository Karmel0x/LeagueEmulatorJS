
/**
 * @typedef {import('../gameobjects/units/Unit')} Unit
 * @typedef {import('../gameobjects/units/Player')} Player
 * @typedef {import('../game/initializers/Teams')} Teams
 */

class Server {
    /**
     * @type {typeof import('../core/Logging')}
     */
    static logging;

    /**
     * @type {import('../core/network/Network')}
     */
    static network;

    /**
     * @type {import('../game/components/MovementSimulation')}
     */
    static movement;

    static command_START_GAME = false;
    static useTerrainEscape = false;
    static doNotUsePathfinding = false;
    static packetLengthWarning = 1000;

    /**
     * @type {Object.<number, number>}
     */
    static playerPeers = {};

    /**
     * @type {Object.<string, Teams>}
     */
    static teams = {};

    static game = {
        initialized: 0,
        loaded: 0,
        started: 0,
    };

    /**
     * @type {Player[]}
     */
    static players = [];
}

module.exports = Server;
