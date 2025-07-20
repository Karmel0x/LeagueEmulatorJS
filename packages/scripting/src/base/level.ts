import type constants from "@repo/gamedata/maps/map1/constants";
import type * as positions from "@repo/gamedata/maps/map1/positions/index";
import type { Vector2Like } from "@repo/geometry";

export default class Level {

    id = 0;
    diagonal = 0;
    positions!: typeof positions;
    constants!: typeof constants;

    middleOfMap!: Vector2Like;

    deathTimes!: number[];
}
