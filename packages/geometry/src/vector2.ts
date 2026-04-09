
// @ts-ignore
import { Vector2 as ThreeVector2, type Vector2Like } from 'three/src/math/Vector2.js';

export type { Vector2Like };

export class Vector2 extends ThreeVector2 {

    static from(v: Vector2Like) {
        return new Vector2(v.x, v.y);
    }

    isZero() {
        return this.x === 0 && this.y === 0;
    }

    forceNormalize() {
        this.normalize();

        if (this.isZero()) {
            this.y = 1;
        }

        return this;
    }

    orthogonalize() {
        const x = this.x;
        this.x = -this.y;
        this.y = x;

        return this;
    }

}
