import AntiBot, { AntiBotModel } from '../s2c/0xDD-AntiBot';

export type AntiBotC2SModel = AntiBotModel & {
    /** max count = 1024 */
    data: Uint8Array,
};

export default class AntiBotC2S extends AntiBot {

}
