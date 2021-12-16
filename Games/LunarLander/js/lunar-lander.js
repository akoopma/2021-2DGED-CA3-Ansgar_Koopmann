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

    initializeShip();

}

function initializeBackground() {

}

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
        new Vector2(2, 2),
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
    sprite.body.friction = FrictionType.Low;
    sprite.body.gravity = GravityType.Weak;

    sprite.attachController(
        new ShipMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            GameData.SHIP_MOVE_KEYS,
            GameData.SHIP_THRUST_ACCELERATION,
            GameData.SHIP_TURN_RATE,
        )
    )

    objectManager.add(sprite);

}

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