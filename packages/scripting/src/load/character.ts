import * as Characters from '@repo/gamedata/data/characters/index';

export function getCharacter(characterName: string) {
    const Character1 = Characters[characterName as keyof typeof Characters];
    const character1 = new Character1();
    return character1;
}
