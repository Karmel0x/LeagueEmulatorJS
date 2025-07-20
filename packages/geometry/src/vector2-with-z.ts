import { Vector2, type Vector2Like } from './vector2';

// TODO: height map
export const defaultHeight = 100;

export type Vector2WithZLike = Vector2Like & {
    z?: number;
};

export class Vector2WithZ extends Vector2 {

    static from(v: Vector2WithZLike, z: number | undefined = undefined) {
        return new this(v.x, v.y, z ?? v.z ?? defaultHeight);
    }

    z;

    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }

    clone() {
        const v = super.clone();
        v.z = this.z;
        return v;
    }

    copy(v: Vector2WithZLike) {
        super.copy(v);
        this.z = v.z ?? defaultHeight;
        return this;
    }

    clampTo(v: Vector2WithZLike, min: number, max: number) {

        this.sub(v);
        this.clampLength(min, max);
        this.add(v);

        return this;
    }

}
