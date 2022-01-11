class GameData {

    static AUDIO_CUE_ARRAY = [
        new AudioCue("rocket", AudioType.Move, 0.4, 1, 0, true),
        new AudioCue("explosion", AudioType.Move, 0.4, 1, 0, false),
    ];

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
            GameData.generateTransform(new Vector2(0, 350), new Vector2(20, 400)),
            GameData.generateTransform(new Vector2(20, 400), new Vector2(50, 450)),
            GameData.generateTransform(new Vector2(50, 450), new Vector2(75, 460)),
            // Landing Spot
            GameData.generateTransform(new Vector2(105, 460), new Vector2(125, 410)),
            GameData.generateTransform(new Vector2(125, 410), new Vector2(150, 370)),
            GameData.generateTransform(new Vector2(150, 370), new Vector2(160, 330)),
            GameData.generateTransform(new Vector2(160, 330), new Vector2(185, 270)),
            GameData.generateTransform(new Vector2(185, 270), new Vector2(190, 290)),
            //Landing Spot
            GameData.generateTransform(new Vector2(220, 290), new Vector2(250, 250)),
            GameData.generateTransform(new Vector2(250, 250), new Vector2(280, 240)),
            GameData.generateTransform(new Vector2(280, 240), new Vector2()),
            GameData.generateTransform(new Vector2(280, 240), new Vector2(300, 280)),
            GameData.generateTransform(new Vector2(300, 280), new Vector2(310, 320)),
            GameData.generateTransform(new Vector2(310, 320), new Vector2(310, 360)),
            GameData.generateTransform(new Vector2(310, 360), new Vector2(380, 380)),
            // Landing Spot
            GameData.generateTransform(new Vector2(410, 380), new Vector2(450, 420)),
            GameData.generateTransform(new Vector2(450, 420), new Vector2(470, 480)),
            GameData.generateTransform(new Vector2(470, 480), new Vector2(520, 510)),
            // Landing Spot
            GameData.generateTransform(new Vector2(550, 510), new Vector2(565, 470)),
            GameData.generateTransform(new Vector2(565, 470), new Vector2(580, 450)),
            GameData.generateTransform(new Vector2(580, 450), new Vector2(630, 420)),
            GameData.generateTransform(new Vector2(630, 420), new Vector2(655, 380)),
            GameData.generateTransform(new Vector2(655, 380), new Vector2(670, 400)),
            // Landing Spot
            GameData.generateTransform(new Vector2(700, 400), new Vector2(730, 350)),
            GameData.generateTransform(new Vector2(730, 350), new Vector2(750, 360)),
            GameData.generateTransform(new Vector2(750, 360), new Vector2(780, 390)),
            GameData.generateTransform(new Vector2(780, 390), new Vector2(850, 410)),
            // Landing Spot
            GameData.generateTransform(new Vector2(880, 410), new Vector2(920, 380)),
            GameData.generateTransform(new Vector2(920, 380), new Vector2(970, 360)),
            GameData.generateTransform(new Vector2(970, 360), new Vector2(990, 380)),
            // Landing Spot
            GameData.generateTransform(new Vector2(1020, 380), new Vector2(1080, 310)),
            GameData.generateTransform(new Vector2(1080, 310), new Vector2(1130, 340)),
            // Landing Spot
            GameData.generateTransform(new Vector2(1160, 340), new Vector2(1200, 280)),
            GameData.generateTransform(new Vector2(1200, 280), new Vector2(1220, 310)),
            GameData.generateTransform(new Vector2(1220, 310), new Vector2(1260, 270)),
            GameData.generateTransform(new Vector2(1260, 270), new Vector2(1280, 230)),
            GameData.generateTransform(new Vector2(1280, 230), new Vector2(1300, 250)),
            // Landing Spot
            GameData.generateTransform(new Vector2(1330, 250), new Vector2(1370, 210)),
            GameData.generateTransform(new Vector2(1370, 210), new Vector2(1390, 260)),
            GameData.generateTransform(new Vector2(1390, 260), new Vector2(1415, 235)),
            GameData.generateTransform(new Vector2(1415, 235), new Vector2(1440, 140)),
            GameData.generateTransform(new Vector2(1440, 140), new Vector2(1460, 180)),
            GameData.generateTransform(new Vector2(1460, 180), new Vector2(1490, 100)),
            GameData.generateTransform(new Vector2(1490, 100), new Vector2(1520, 160)),
            // Landing Spot
            GameData.generateTransform(new Vector2(1550, 160), new Vector2(1580, 110)),
            GameData.generateTransform(new Vector2(1580, 110), new Vector2(1600, 130)),
            
            
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
            GameData.generateTransform(new Vector2(190, 290), new Vector2(220, 290)),
            GameData.generateTransform(new Vector2(380, 380), new Vector2(410, 380)),
            GameData.generateTransform(new Vector2(520, 510), new Vector2(550, 510)),
            GameData.generateTransform(new Vector2(670, 400), new Vector2(700, 400)),
            GameData.generateTransform(new Vector2(850, 410), new Vector2(880, 410)),
            GameData.generateTransform(new Vector2(990, 380), new Vector2(1020, 380)),
            GameData.generateTransform(new Vector2(1130, 340), new Vector2(1160, 340)),
            GameData.generateTransform(new Vector2(1300, 250), new Vector2(1330, 250)),
            GameData.generateTransform(new Vector2(1520, 160), new Vector2(1550, 160)),
        ],

        multipliers: [
            3,
            2,
            1,
            2,
            3,
            2,
            3,
            4,
            5,
            6,
            



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
    static SHIP_START_VELOCITY = new Vector2(0.5,0);
    static SHIP_GRAVITY_ACCELERATION = 0.075;
    static SHIP_START_FACING = new Vector2(1, 0);
    static SHIP_START_FUEL = 1000;
    static SHIP_FUEL_CONSUMPTION = 25;
    static SHIP_MOVE_KEYS = [Keys.A, Keys.D, Keys.W];
    static SHIP_TURN_RATE = Math.PI;
    static SHIP_THRUST_ACCELERATION = 0.2;
    static SHIP_SPRITE_ROTATION_OFFSET = Math.PI/2;
    static SHIP_PERCECT_LAND_VELOCITY = 0.1;
    static SHIP_PERFECT_LAND_X_ROTATION = 0.995;
    static SHIP_SAFE_LAND_VELOCITY = 0.2;
    static SHIP_SAFE_LAND_X_ROTATION = 0.98;

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