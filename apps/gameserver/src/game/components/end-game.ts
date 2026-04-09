
import * as packets from '@repo/packets/list';
import fs from 'fs';
import Server from '../../app/server';
import { TeamId } from '../../gameobjectextensions/traits/team';
import type { Player } from '../../gameobjects/unit-ai';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';

const END_GAME_RESULT_FILE = './match-result.json';

export type MatchResult = {
    duration: number,
    winTeamNum: number,
    playerStats: {
        kills: number,
        deaths: number,
        assists: number,
        level: number,
        goldEarned: number,
        minionsKilled: number,
        //turretsDestroyed: number,
        items: (number | null)[],
    }[],
};

export default class EndGame {
    static gameEnded = false;

    static async process(killedUnit: AttackableUnit) {
        if (this.gameEnded)
            return;

        this.gameEnded = true;

        try {
            const enemyTeamId = killedUnit.team.getEnemyTeamId();
            console.log('game end, win team:', enemyTeamId);

            const packet1 = packets.EndGame.create({
                isTeamOrderWin: enemyTeamId === TeamId.order,
                surrender: false,
            });
            const to = Server.teams[TeamId.all]!;
            to.sendPacket(packet1);

            const matchResult: MatchResult = {
                duration: Math.round(Server.game.timer.now() / 1000),
                winTeamNum: enemyTeamId,
                playerStats: Server.players.map(v => {
                    const ai = v.ai as Player;
                    const stats: MatchResult['playerStats'][number] = {
                        kills: ai.scoreboard.kills,
                        deaths: ai.scoreboard.deaths,
                        assists: ai.scoreboard.assists,
                        level: v.progress.level,
                        goldEarned: Math.floor(v.progress.goldTotal),
                        minionsKilled: ai.scoreboard.minionsKilled,
                        //turretsDestroyed: ai.scoreboard.turretsDestroyed,
                        items: v.inventory.items.map(i => i ? i.item.itemId : null),
                    };
                    return stats;
                }),
            };

            const matchResultJson = JSON.stringify(matchResult);
            await fs.promises.writeFile(END_GAME_RESULT_FILE, matchResultJson);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setTimeout(() => {
                process.exit();
            }, 1000 * 2);
        }
    }
}