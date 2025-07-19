import PlayEmote, { type PlayEmoteModel } from '../s2c/0x42-PlayEmote';

export enum Emote {
	dance = 0x0,
	taunt = 0x1,
	laugh = 0x2,
	joke = 0x3,
};

export type PlayEmoteC2SModel = PlayEmoteModel & {
	emoteId: Emote,
};

export default class PlayEmoteC2S extends PlayEmote {

}
