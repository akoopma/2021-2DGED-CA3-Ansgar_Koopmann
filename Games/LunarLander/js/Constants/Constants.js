class GameData {

    static SHIP_START_POSITION = new Vector2(20,20);
    static SHIP_START_VELOCITY = new Vector2(0,0);
    static SHIP_START_FACING = new Vector2(1, 0);
    static SHIP_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];
    static SHIP_TURN_RATE = Math.PI;
    static SHIP_THRUST_ACCELERATION = 0.5;
    static SHIP_SPRITE_ROTATION_OFFSET = Math.PI/2;

    static SHIP_ANIMATION_DATA = {

        id: "Ship Animation Data",
        spriteSheet: document.getElementById("ship_sprite_sheet"),

        takes: {
            
            "Idle": {
                frameRatePerSec: 4,

                maxLoopCount: -1,

                startFrameIndex: 0,
                endFrameIndex: 9,

                boundingBoxDimensions: new Vector2(15, 24),

                frames: [
                    new Rect(0, 0, 15, 24),
                    new Rect(0, 24, 15, 24),
                    new Rect(16, 0, 15, 24),
                    new Rect(16, 24, 15, 24),
                    new Rect(32, 0, 15, 24),
                    new Rect(32, 24, 15, 24),
                    new Rect(48, 0, 15, 24),
                    new Rect(48, 24, 15, 24),
                    new Rect(64, 0, 15, 24),
                    new Rect(64, 24, 15, 24),
                ]
            }
        }

    };
}