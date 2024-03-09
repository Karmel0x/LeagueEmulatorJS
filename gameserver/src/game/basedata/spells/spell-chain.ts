import type Missile from "../../../gameobjects/missiles/missile";
import type { Vector2 } from "three";

export default class SpellChain {
    position?: Vector2;
    anglePosition?: Vector2;
    missile?: Missile;
}
