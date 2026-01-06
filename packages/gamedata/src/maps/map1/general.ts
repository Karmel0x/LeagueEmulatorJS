import Level from '@repo/scripting/base/level';
import constants from './constants';
import * as positions from "./positions";

export default class SummonersRift extends Level {

    id = 1;
    diagonal = 25000;
    positions = positions;
    constants = constants;

    // TODO: need to verify
    middleOfMap = {
        x: 6991.434,
        y: 7223.3438
    };

    expCurve = [
        280,
        660,
        1140,
        1720,
        2400,
        3180,
        4060,
        5040,
        6120,
        7300,
        8580,
        9960,
        11440,
        13020,
        14700,
        16480,
        18360,
        19060,
        19760,
        20460,
        21160,
        21860,
        22560,
        23260,
        23960,
        24660,
        25360,
        26060,
        26760,
    ];

    deathTimes = [
        7.5,
        10,
        12.5,
        15,
        17.5,
        20,
        22.5,
        25,
        27.5,
        30,
        32.5,
        35,
        37.5,
        40,
        42.5,
        45,
        47.5,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
    ];

}
