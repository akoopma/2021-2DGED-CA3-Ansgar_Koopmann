class ShipMoveController {
    constructor(
        notificationCenter,
        keyboardManager,
        objectManager,
        gameStateManager,
        moveKeys,
        thrustAcceleration,
        turnRate,
        fuelConsumption,
        rotationOffset
    ) {
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;
        this.gameStateManager = gameStateManager;

        this.moveKeys = moveKeys;
        this.thrustAcceleration = thrustAcceleration;
        this.turnRate = turnRate;
        this.fuelConsumption = fuelConsumption;
        this.rotationOffset = rotationOffset;
    }

    update(gameTime, parent) {
        if ((this.gameStateManager.gameState === GameStates.Play)) {
            this.applyForces(gameTime, parent);
            this.handleInput(gameTime, parent);
            this.checkCollisions(parent);
            this.applyInput(parent);
        }
    }

    applyForces(gameTime, parent) {
        parent.body.applyGravity(gameTime);
    }

    handleInput(gameTime, parent) {
        this.handleTurn(gameTime, parent);
        this.handleThrust(gameTime, parent);
    }

    handleTurn(gameTime, parent) {
        if (
            this.keyboardManager.isKeyDown(this.moveKeys[0]) 
            && (parent.body.facingY > -1 && parent.body.facingX > 0 || parent.body.facingY > 0 ) 
            && !parent.body.onGround
        ) {
            parent.body.turnCounterClockwise(
                (this.turnRate * gameTime.elapsedTimeInMs) / 1000
            );
        }
        if (
            this.keyboardManager.isKeyDown(this.moveKeys[1]) 
            && (parent.body.facingY < 1 && parent.body.facingX > 0 || parent.body.facingY < 0) 
            && !parent.body.onGround
        ) {
            parent.body.turnClockwise(
                (this.turnRate * gameTime.elapsedTimeInMs) / 1000
            );
        }
    }

    handleThrust(gameTime, parent) {
        if (
            this.keyboardManager.isKeyDown(this.moveKeys[2]) &&
            !parent.body.onGround &&
            this.gameStateManager.shipFuel > 0
        ) {
            parent.body.turnCounterClockwise(this.rotationOffset);
            parent.body.addVelocityFacing(
                (this.thrustAcceleration * gameTime.elapsedTimeInMs) / 1000
            );
            parent.body.turnCounterClockwise(-this.rotationOffset);

            const frameIndex = parent.artist.currentFrameIndex;
            parent.artist.setTake("Thrust");
            parent.artist.currentFrameIndex = frameIndex;

            this.notificationCenter.notify(
                new Notification(
                    NotificationType.GameState,
                    NotificationAction.UpdateFuel,
                    [(-this.fuelConsumption * gameTime.elapsedTimeInMs) / 1000]
                )
            );
        } else {
            const frameIndex = parent.artist.currentFrameIndex;
            parent.artist.setTake("Idle");
            parent.artist.currentFrameIndex = frameIndex;
        }
    }

    checkCollisions(parent) {
        this.handleLandingCollision(parent);
        this.handleGroundCollision(parent);
    }

    handleLandingCollision(parent) {
        const landingSpots = this.objectManager.get(ActorType.Platform);

        for (let i = 0; i < landingSpots.length; i++) {
            const landingSpot = landingSpots[i];

            let collisionType = Collision.GetCollisionLocationType(
                parent,
                landingSpot
            );

            if (collisionType === CollisionLocationType.Bottom) {
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.Land,
                        [
                            parent.body,
                            GameData.LANDING_DATA.multipliers[i]
                        ]
                    )
                )
                parent.body.setVelocityY(0);
                parent.body.setVelocityX(0);
                parent.body.onGround = true;
            }
            if (
                collisionType === CollisionLocationType.Left ||
                collisionType === CollisionLocationType.Right ||
                collisionType === CollisionLocationType.Top
            ) {
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.Crash
                    )
                );
            }
        }
    }

    handleGroundCollision(parent) {
        const groundArray = this.objectManager.get(ActorType.Ground);

        for (let i = 0; i < groundArray.length; i++) {
            const ground = groundArray[i];

            let collisionType = Collision.GetCollisionLocationType(parent, ground);

            if (collisionType !== null) {
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.Crash
                    )
                );
            }
        }
    }

    applyInput(parent) {
        parent.transform.setRotationInRadians(
            Math.atan2(parent.body.facingY, parent.body.facingX)
        );
        parent.transform.translateBy(
            new Vector2(parent.body.velocityX, parent.body.velocityY)
        );
    }
}
