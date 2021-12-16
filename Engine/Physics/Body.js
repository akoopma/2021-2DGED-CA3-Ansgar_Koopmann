/**
 * Represents the physical properties of a sprite (e.g. mass, velocity, friction)
 * @author
 * @version 1.0
 * @class Body
 */
const FrictionType = {
    Low: 0.9,
    Normal: 0.7,
    High: 0.5
};

const GravityType = {
    Weak: 0.2,
    Normal: 0.4,
    Strong: 0.7
};

class Body {

    static MAX_SPEED = 10;
    static MIN_SPEED = 0.01;

    get maximumSpeed() {
        return this._maximumSpeed;
    }
    get gravity() {
        return this._gravity;
    }
    get friction() {
        return this._friction;
    }

    set maximumSpeed(maximumSpeed) {
        this._maximumSpeed = maximumSpeed || Body.MAX_SPEED;
    }
    set gravity(gravity) {
        this._gravity = gravity || GravityType.Normal;
    }
    set friction(friction) {
        this._friction = friction || FrictionType.Normal;
    }

    constructor(maximumSpeed, gravity, friction) {
        this.maximumSpeed = maximumSpeed;
        this.gravity = gravity;
        this.friction = friction;

        this.velocityX = 0;
        this.velocityY = 0;

        this.facingX = 1;
        this.facingY = 0;

        this.jumping = false;
        this.onGround = false;
    }

    applyGravity() {
        this.velocityY += this.gravity;
    }

    applyFriction() {
        this.velocityX *= this.friction;
    }

    setVelocityX(velocityX) {
        
        if (velocityX <= this.maximumSpeed) {

            this.velocityX = velocityX;
        }
    }

    setVelocityY(velocityY) {
        this.velocityY = velocityY;
    }

    addVelocityX(deltaVelocityX) {

        if (Math.abs(this.velocityX + deltaVelocityX) <= this.maximumSpeed) {

            this.velocityX += deltaVelocityX;
        }
    }

    addVelocityY(deltaVelocityY) {
        this.velocityY += deltaVelocityY;
    }

    setFacingX(facingX) {
        this.facingX = facingX;
    }

    setFacingY(facingY) {
        this.facingY = facingY;
    }

    turnCounterClockwise(radians) {
        radians =  -1 * radians;
        let degrees = radians * 180/Math.PI;

        let newX = Math.cos(degrees) * this.facingX - Math.sin(degrees) * this.facingY;
        let newY = Math.sin(degrees) * this.facingX + Math.cos(degrees) * this.facingY;

        this.facingX = newX;
        this.facingY = newY;
    }

    turnClockwise(radians) {


        let degrees = radians * 180/Math.PI;
        let newX = Math.cos(degrees) * this.facingX - Math.sin(degrees) * this.facingY;
        let newY = Math.sin(degrees) * this.facingX + Math.cos(degrees) * this.facingY;

        this.facingX = newX;
        this.facingY = newY;
    }

    equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other)
            && this.maximumSpeed === other.maximumSpeed
            && this.gravity === other.gravity
            && this.friction === other.friction;
    }

    toString() {
        return "[" +
            this.maximumSpeed + ", " +
            this.gravity + ", " +
            this.friction + ", " +
            this.velocityX + ", " +
            this.velocityY +
        "]";
    }

    clone() {
        return new Body(this.maximumSpeed, this.gravity, this.friction);
    }
}