class ShipMoveController {
    constructor (
        notificationCenter,
        keyboardManager,
        objectManager,
        moveKeys,
        thrustAcceleration,
        turnRate,
        rotationOffset
   ) {
       this.notificationCenter = notificationCenter;
       this.keyboardManager = keyboardManager;
       this.objectManager = objectManager;

       this.moveKeys = moveKeys;
       this.thrustAcceleration = thrustAcceleration;
       this.turnRate = turnRate;
       this.rotationOffset = rotationOffset;
   }

   update(gameTime, parent) {
       //this.applyForces(gameTime, parent);
       this.handleInput(gameTime, parent);
       this.applyInput(parent);

   }

   applyForces(gameTime, parent) {
       parent.body.applyGravity(gameTime);
   }

   handleInput(gameTime, parent) {
       this.handleTurn(gameTime, parent);
       this.handleThrust(gameTime, parent);
   }

   handleTurn(gameTime, parent) {
       if (this.keyboardManager.isKeyDown(this.moveKeys[0])) {
           parent.body.turnCounterClockwise(this.turnRate * gameTime.elapsedTimeInMs/1000);

       }
       if (this.keyboardManager.isKeyDown(this.moveKeys[1])) {
        parent.body.turnClockwise(this.turnRate * gameTime.elapsedTimeInMs/1000);

    }
   }

   handleThrust(gameTime, parent) {
       if (this.keyboardManager.isKeyDown(this.moveKeys[2])) {

           parent.body.turnCounterClockwise(this.rotationOffset);
           parent.body.addVelocityFacing(this.thrustAcceleration * gameTime.elapsedTimeInMs/1000)   
           parent.body.turnCounterClockwise(-this.rotationOffset)

           const frameIndex = parent.artist.currentFrameIndex;
           parent.artist.setTake("Thrust");
           parent.artist.currentFrameIndex = frameIndex;
       } else {
           const frameIndex = parent.artist.currentFrameIndex;
           parent.artist.setTake("Idle");
           parent.artist.currentFrameIndex = frameIndex;
       }
   }

   applyInput(parent) {
       parent.transform.setRotationInRadians(Math.atan2(parent.body.facingY, parent.body.facingX));
       parent.transform.translateBy(
           new Vector2(
               parent.body.velocityX,
               parent.body.velocityY
           )
       );

   }

}