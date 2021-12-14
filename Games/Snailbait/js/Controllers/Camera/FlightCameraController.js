/**
 * Moves Camera2D by changing the parent transform based on user input.
 *
 * @author Niall McGuinness
 * @version 1.0
 * @class FlightCameraController
 */
class FlightCameraController {
    
    constructor(
        keyboardManager, 
        moveKeys, 
        moveSpeed, 
        rotateSpeedInRadians, 
        scaleSpeed,
        playerSprite
    ) {
        this.playerSprite = playerSprite;
        this.keyboardManager = keyboardManager;
        this.moveKeys = moveKeys;
        this.moveSpeed = moveSpeed;
        this.rotateSpeedInRadians = rotateSpeedInRadians;
        this.scaleSpeed = scaleSpeed;
    }

    /**
     * 
     * @param {GameTime} gameTime 
     * @param {Actor2D} parent 
     */
    update(gameTime, parent) {

        // Translate camera
        if (this.keyboardManager.isKeyDown(this.moveKeys[0])) {

            // Move left
            parent.transform.translateBy(Vector2.MultiplyScalar(this.moveSpeed, -1));
        }

        else if (this.keyboardManager.isKeyDown(this.moveKeys[1])) {

            // Move right
            parent.transform.translateBy(Vector2.MultiplyScalar(this.moveSpeed, 1));
        }

        // Rotate camera
        if (this.keyboardManager.isKeyDown(this.moveKeys[2])) {

            // Rotate anti-clockwise
            parent.transform.rotateBy(-this.rotateSpeedInRadians);
        }

        else if (this.keyboardManager.isKeyDown(this.moveKeys[3])) {

            // Rotate clockwise
            parent.transform.rotateBy(this.rotateSpeedInRadians);
        }

        // Scale camera
        if (this.keyboardManager.isKeyDown(this.moveKeys[4])) {

            // Scale up
            parent.transform.scaleBy(Vector2.MultiplyScalar(this.scaleSpeed, 1));
        }

        else if (this.keyboardManager.isKeyDown(this.moveKeys[5])) {

            // Scale down
            parent.transform.scaleBy(Vector2.MultiplyScalar(this.scaleSpeed, -1));
        }

        // Reset camera
        if (this.keyboardManager.isKeyDown(this.moveKeys[6])) {

            // Reset
            parent.transform.reset();
        }
    }
}