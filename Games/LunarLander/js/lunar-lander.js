// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");


/* GAME VARIABLES HERE */

let gameTime;
let notificationCenter;

let cameraManager;
let objectManager;
let menuManager;
let keyboardManager;
let mouseManager;
let gameStateManager;
let uiManager;


// Create a function that will load our game
function loadGame() {
    gameTime = new GameTime();

    initializeGame();

    notificationCenter.notify(
        new Notification(
            NotificationType.Menu,
            NotificationAction.ShowMenuChanged,
            [StatusType.Off]
        )
    );
    notificationCenter.notify(
        new Notification(
            NotificationType.GameState,
            NotificationAction.Play
        )
    )

    window.requestAnimationFrame(animate);
}

// Create a function that will run every time the browser updates
function animate(now) {
    // Update game state
    gameTime.update(now);

    update(gameTime);

    // Re-draw updated game state
    draw(gameTime);

    // Loop
    window.requestAnimationFrame(animate);
}

// Create a function that will update our game
function update(gameTime) {
    objectManager.update(gameTime);

}

// Create a function that will re-draw our updated game
function draw() {
    clearCanvas();

    objectManager.draw(gameTime);

}

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

// Set up game values
function initializeGame() {

    initializeNotificationCenter();
    initializeManagers();
    initializeCameras();
    initializeSprites();

}

function initializeNotificationCenter() {
    notificationCenter = new NotificationCenter();
}

function initializeManagers() {

    cameraManager = new CameraManager(
        "Camera Manager"
    );

    objectManager = new ObjectManager(
        "Object Manager",
        notificationCenter,
        context,
        StatusType.Drawn | StatusType.Updated,
        cameraManager
    );

    keyboardManager = new KeyboardManager(
        "Keyboard Manager"
    );

    mouseManager = new MouseManager(
        "Mouse Manager"
    );

    menuManager = new MyMenuManager(
        "Menu Manager",
        notificationCenter,
        keyboardManager
    );

    gameStateManager = new MyGameStateManager(
        "Game State Manager",
        notificationCenter,
        GameData.SHIP_START_FUEL,
        GameData.SHIP_PERCECT_LAND_VELOCITY,
        GameData.SHIP_PERFECT_LAND_X_ROTATION,
        GameData.SHIP_SAFE_LAND_VELOCITY,
        GameData.SHIP_SAFE_LAND_X_ROTATION
    );

    uiManager = new MyUIManager(
        "UI Manager",
        notificationCenter,
        objectManager,
        mouseManager
    );

}

function initializeCameras() {
    let transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        new Vector2(
            canvas.clientWidth / 2,
            canvas.clientHeight / 2
        ),
        new Vector2(
            canvas.clientWidth,
            canvas.clientHeight
        )
    );

    let camera = new Camera2D(
        "Camera 1",
        transform,
        ActorType.Camera,
        StatusType.Updated
    );

    cameraManager.add(camera);
}

function initializeSprites() {

    initializeBackground();
    initializeLandingSpots();
    initializeLandingText();
    initializeShip();

    initializeHUD();
}

function initializeBackground() {
    let transform;
    let artist;
    let spriteArchetype;


    artist = new RectangleSpriteArtist(
        context,
        1,
        GameData.TERRAIN_DATA.lineWidth,
        GameData.TERRAIN_DATA.strokeStyle,
        0,
        true
    )

    transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.Zero,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    spriteArchetype = new Sprite(
        GameData.TERRAIN_DATA.id,
        transform,
        GameData.TERRAIN_DATA.actorType,
        GameData.TERRAIN_DATA.collisionType,
        GameData.TERRAIN_DATA.statusType,
        artist,
        GameData.TERRAIN_DATA.scrollSpeedMultiplier,
        GameData.TERRAIN_DATA.layerDepth
    );

    for (let i = 0; i < GameData.TERRAIN_DATA.transformArray.length; i++) {
        spriteClone = spriteArchetype.clone();
        spriteClone.id = spriteClone.id + i;
        spriteClone.transform = GameData.TERRAIN_DATA.transformArray[i];
        objectManager.add(spriteClone);
    }
};

function initializeLandingSpots() {
    let transform;
    let artist;
    let spriteArchetype;


    artist = new RectangleSpriteArtist(
        context,
        1,
        GameData.LANDING_DATA.lineWidth,
        GameData.LANDING_DATA.strokeStyle,
        0,
        true
    );

    transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.Zero,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    spriteArchetype = new Sprite(
        GameData.LANDING_DATA.id,
        transform,
        GameData.LANDING_DATA.actorType,
        GameData.LANDING_DATA.collisionType,
        GameData.LANDING_DATA.statusType,
        artist,
        GameData.LANDING_DATA.scrollSpeedMultiplier,
        GameData.LANDING_DATA.layerDepth
    );

    for (let i = 0; i < GameData.LANDING_DATA.transformArray.length; i++) {
        spriteClone = spriteArchetype.clone();
        spriteClone.id = spriteClone.id + i;
        spriteClone.transform = GameData.LANDING_DATA.transformArray[i];
        objectManager.add(spriteClone);
    }
};

function initializeLandingText() {
    let transform;
    let artist;
    let spriteArchetype;


    artist = new TextSpriteArtist(
        context, 
        1,
        "",
        "Arial",
        Color.White,
        "Center",
        20,
        0
    );

    transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.Zero,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    spriteArchetype = new Sprite(
        "LandingText",
        transform,
        ActorType.Background,
        CollisionType.NotCollidable,
        StatusType.Drawn,
        artist,
        GameData.LANDING_DATA.scrollSpeedMultiplier,
        GameData.LANDING_DATA.layerDepth
    );

    for (let i = 0; i < GameData.LANDING_DATA.multipliers.length; i++) {
        artist.text = "X" + GameData.LANDING_DATA.multipliers[i];
        spriteClone = spriteArchetype.clone();
        spriteClone.id = spriteClone.id + i;
        spriteClone.transform = GameData.LANDING_DATA.transformArray[i].clone();
        spriteClone.transform.translateBy(new Vector2(10, -15))
        objectManager.add(spriteClone);
    }
};

function initializeShip() {
    let transform;
    let artist;
    let sprite;

    artist = new AnimatedSpriteArtist(
        context,
        1,
        GameData.SHIP_ANIMATION_DATA
    );

    artist.setTake("Idle");

    transform = new Transform2D(
        GameData.SHIP_START_POSITION,
        0,
        new Vector2(1, 1),
        Vector2.Zero,
        artist.getBoundingBoxByTakeName("Idle"),
        0
    );

    sprite = new MoveableSprite(
        "Ship",
        transform,
        ActorType.Player,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    sprite.body.maximumSpeed = 6;
    sprite.body.velocityX = GameData.SHIP_START_VELOCITY.x;
    sprite.body.velocityY = GameData.SHIP_START_VELOCITY.y;
    sprite.body.friction = FrictionType.Low;
    sprite.body.gravity = GravityType.Moon;

    sprite.attachController(
        new ShipMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            gameStateManager,
            GameData.SHIP_MOVE_KEYS,
            GameData.SHIP_THRUST_ACCELERATION,
            GameData.SHIP_TURN_RATE,
            GameData.SHIP_FUEL_CONSUMPTION,
            GameData.SHIP_SPRITE_ROTATION_OFFSET,
        )
    )
    objectManager.add(sprite);
};

function initializeHUD() {

    initializeFuel();
    initializeScore();
};

function initializeFuel() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(
            canvas.clientWidth - 120,
            20
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(20, 10)
    );

    artist = new TextSpriteArtist(
        context,
        1,
        'Fuel: ' + GameData.SHIP_START_FUEL,
        FontType.InformationMedium,
        Color.White,
        TextAlignType.Left,
        200,
        false
    );

    sprite = new Sprite(
        "Text UI Fuel",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    objectManager.add(sprite);
};

function initializeScore() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(
            canvas.clientWidth - 120,
            45
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(20, 10)
    );

    artist = new TextSpriteArtist(
        context,
        1,
        'Score: ' + 0,
        FontType.InformationMedium,
        Color.White,
        TextAlignType.Left,
        200,
        false
    );

    sprite = new Sprite(
        "Text UI Score",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    objectManager.add(sprite);
};

let keysDown = {};

// Add an event listener that will be triggered when the
// user presses (or holds) a button

// In this example, we are using an anonymouse function
// i.e. a function without a name
window.addEventListener("keydown", function (event) {

    // Add the button that the user has pressed to a 
    // keysDown object
    keysDown[event.key] = true;
});

// Add an event listener that will be triggered when the 
// user releases a button

// In this example, we are using an anonymouse function
// i.e. a function without a name
window.addEventListener("keyup", function (event) {

    // Remove the key that the user is no longer pressing
    // from our keysDown object
    delete keysDown[event.key];
});

// Load our game when the webpage is loaded
window.addEventListener("load", loadGame);