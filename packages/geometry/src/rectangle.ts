import { Vector2, type Vector2Like } from './vector2';

export class Rectangle {

    center: Vector2;
    halfLength: number;
    halfWidth: number;
    rotation: number = 0;

    constructor(center: Vector2Like, halfLength: number, halfWidth: number) {
        this.center = new Vector2(center.x, center.y);
        this.halfWidth = halfWidth;
        this.halfLength = halfLength;
    }

    rotate(angle: number) {
        this.rotation += angle;
    }

    lookAt(target: Vector2Like) {
        const direction = new Vector2(target.x - this.center.x, target.y - this.center.y);
        this.rotation = Math.atan2(direction.y, direction.x);
    }

    static rotatePoint(point: Vector2, angle: number, origin: Vector2): Vector2 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const translatedX = point.x - origin.x;
        const translatedY = point.y - origin.y;

        return new Vector2(
            translatedX * cos - translatedY * sin + origin.x,
            translatedX * sin + translatedY * cos + origin.y
        );
    }

    containsPoint(point: Vector2): boolean {
        const { center, rotation, halfLength, halfWidth } = this;

        const localPoint = new Vector2(
            point.x - center.x,
            point.y - center.y
        );

        const rotatedPoint = Rectangle.rotatePoint(localPoint, -rotation, new Vector2());

        return (
            Math.abs(rotatedPoint.x) <= halfLength &&
            Math.abs(rotatedPoint.y) <= halfWidth
        );
    }

    getRadius(): number {
        const { halfLength, halfWidth } = this;
        const maxRange = Math.sqrt(halfLength * halfLength + halfWidth * halfWidth);
        return maxRange;
    }

}
