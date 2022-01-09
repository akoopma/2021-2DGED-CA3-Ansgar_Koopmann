class GameData {

    static TERRAIN_DATA = {

        id: "Terrain",
        lineWidth: 1,
        strokeStyle: Color.White,
        actorType: ActorType.Ground,
        collisionType: CollisionType.Collidable,
        statusType: StatusType.Drawn,
        scrollSpeedMultiplier: 0,
        layerDepth: 0,

        transformArray: [
            GameData.generateTransform(new Vector2(0, 600), new Vector2(20, 550)),
            GameData.generateTransform(new Vector2(20, 550), new Vector2(30, 510)),
            GameData.generateTransform(new Vector2(30, 510), new Vector2(50, 500)),
            GameData.generateTransform(new Vector2(50, 500), new Vector2(75, 460)),
            // Landing Sport
            GameData.generateTransform(new Vector2(105, 460), new Vector2(125, 410)),
            
            
        ],
    };

    static LANDING_DATA = {
        id: "Landing",
        lineWidth: 1,
        strokeStyle: Color.White,
        actorType: ActorType.Platform,
        collisionType: CollisionType.Collidable,
        statusType: StatusType.Drawn,
        scrollSpeedMultiplier: 0,
        layerDepth: 0,
        multiplier: Number,
        transform: Transform2D,

        transformArray: [
            GameData.generateTransform(new Vector2(75, 460), new Vector2(105, 460)),
        ],

        multipliers: [
            4,
        ]
    }

    static generateTransform(start, end) {
        const canvas = document.getElementById("main_canvas");
        let startCoord = new Vector2(start.x, canvas.clientHeight- start.y);
        let endCoord = new Vector2(end.x, canvas.clientHeight- end.y);
        let lineVector = Vector2.Subtract(endCoord, startCoord);
        let angle = -Math.atan(lineVector.y/lineVector.x);
        let distance = Math.sqrt(Math.pow(lineVector.x, 2) + Math.pow(lineVector.y, 2));
        return new Transform2D(start, angle, Vector2.One, Vector2.Zero, new Vector2(distance, 0));
    }

    static SHIP_START_POSITION = new Vector2(20,20);
    static SHIP_START_VELOCITY = new Vector2(0.25,0);
    static SHIP_START_FACING = new Vector2(1, 0);
    static SHIP_START_FUEL = 1000;
    static SHIP_FUEL_CONSUMPTION = 25;
    static SHIP_MOVE_KEYS = [Keys.A, Keys.D, Keys.W];
    static SHIP_TURN_RATE = Math.PI;
    static SHIP_THRUST_ACCELERATION = 0.1;
    static SHIP_SPRITE_ROTATION_OFFSET = Math.PI/2;
    static SHIP_PERCECT_LAND_VELOCITY = 0.1
    static SHIP_PERFECT_LAND_X_ROTATION = 0.99;
    static SHIP_SAFE_LAND_VELOCITY = 0.2;
    static SHIP_SAFE_LAND_X_ROTATION = 0.95;

    static SHIP_ANIMATION_DATA = {

        id: "Ship Animation Data",
        spriteSheet: document.getElementById("ship_sprite_sheet"),

        takes: {
            
            "Idle": {
                frameRatePerSec: 4,

                maxLoopCount: -1,

                startFrameIndex: 0,
                endFrameIndex: 9,

                boundingBoxDimensions: new Vector2(14, 18),

                frames: [
                    new Rect(1, 0, 14, 24),
                    new Rect(1, 24, 14, 24),
                    new Rect(16, 0, 15, 24),
                    new Rect(16, 24, 15, 24),
                    new Rect(32, 0, 15, 24),
                    new Rect(32, 24, 15, 24),
                    new Rect(48, 0, 15, 24),
                    new Rect(48, 24, 15, 24),
                    new Rect(64, 0, 14, 24),
                    new Rect(64, 24, 14, 24),
                ]
            },

            "Thrust": {
                frameRatePerSec: 4,

                maxLoopCount: -1,

                startFrameIndex: 0,
                endFrameIndex: 9,

                boundingBoxDimensions: new Vector2(14, 18),

                frames: [
                    new Rect(1, 48, 14, 24),
                    new Rect(1, 72, 14, 24),
                    new Rect(16, 48, 15, 24),
                    new Rect(16, 72, 15, 24),
                    new Rect(32, 48, 15, 24),
                    new Rect(32, 72, 15, 24),
                    new Rect(48, 48, 15, 24),
                    new Rect(48, 72, 15, 24),
                    new Rect(64, 48, 14, 24),
                    new Rect(64, 72, 14, 24),
                ]
            }
        }

    };
}

const FontType = {
    
    InformationSmall: "12px Arial",
    InformationMedium: "18px Arial",
    InformationLarge: "24px Arial"
}