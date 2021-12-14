// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

/** CORE GAME LOOP CODE - DO NOT CHANGE */

let gameTime;
let notificationCenter;

let cameraManager;
let objectManager;
let keyboardManager;
let mouseManager;
let soundManager;
let gameStateManager;
let menuManager;
let uiManager;

// Set to false to hide bounding boxes
const debugMode = false;

function start() {

    // Create a new gameTime object
    // This will allow us to keep track of the time in our game
    gameTime = new GameTime();

    // Initialize game
    initialize();

    // Publish an event to pause the object manager, by setting its StatusType
    // to off (i.e. no update, no draw). This, in turn, shows the menu.
    notificationCenter.notify(
        new Notification(
            NotificationType.Menu,
            NotificationAction.ShowMenuChanged,
            [StatusType.Off]
        )
    );

    // Start the game loop
    window.requestAnimationFrame(animate);
}

function animate(now) {

    // Update game time
    gameTime.update(now);

    // Update game
    update(gameTime);

    // Re-draw game
    draw(gameTime);

    // Loop
    window.requestAnimationFrame(animate);
}

function update(gameTime) {

    // Call the update method of the object manager class
    // to update all sprites
    objectManager.update(gameTime);

    // Call the update method of the game state manager
    // class to update the game state
    gameStateManager.update(gameTime);

    // Call the update method of the menu manager class to
    // check for menu state changes
    menuManager.update(gameTime);

    // Call the update method of the ui manager class to
    // check for ui state changes
    uiManager.update(gameTime);

    // Call the update method of the camera manager class
    // to update all cameras
    cameraManager.update(gameTime);

    // If we are in debug mode
    if (debugMode) {

        // Call the update method of the debug drawer class
        // to update debug info
        debugDrawer.update(gameTime);
    }
}

function draw(gameTime) {

    // Clear previous draw
    clearCanvas();

    // Call the draw method of the object manager class
    // to draw all sprites
    objectManager.draw(gameTime);

    // If we are in debug mode
    if (debugMode) {

        // Call the draw method of the debug drawer class
        // to display debug info
        debugDrawer.draw(gameTime);
    }
}

function clearCanvas() {

    context.save();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.restore();

    // context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

/** GAME SPECIFIC CODE BELOW - CHANGE AS NECESSARY */

function initialize() {

    initializeNotificationCenter();
    initializeManagers();
    initializeCameras();
    initializeSprites();

    // If we are in debug mode
    if (debugMode) {

        // Initialize debug drawer
        initializeDebugDrawer();
    }
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

    soundManager = new SoundManager(
        "Sound Manager",
        notificationCenter,
        GameData.AUDIO_CUE_ARRAY
    );

    gameStateManager = new MyGameStateManager(
        "Game State Manager",
        notificationCenter,
        100,                            // Initial player health
        36                              // Initial player ammo
    )

    menuManager = new MyMenuManager(
        "Menu Manager",
        notificationCenter,
        keyboardManager
    );

    uiManager = new MyUIManager(
        "UI Manager",
        notificationCenter,
        objectManager,
        mouseManager
    )
}

function initializeDebugDrawer() {

    debugDrawer = new DebugDrawer(
        "Debug Drawer",
        context,
        objectManager,
        cameraManager
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

    // You should extract the below variables used to construct the flight
    // camera controller class into a seperate constants file. There should
    // be very few magic variables/numbers in your code!

    // See more: 
    // https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad

    camera.attachController(
        new FlightCameraController(
            keyboardManager,
            [
                Keys.Numpad4, Keys.Numpad6, Keys.Numpad7, Keys.Numpad9,
                Keys.Numpad8, Keys.Numpad2, Keys.Numpad5
            ],
            new Vector2(3, 0),
            Math.PI / 180,
            new Vector2(0.005, 0.005)
        )
    );

    cameraManager.add(camera);
}

function initializeSprites() {

    initializeBackground();
    initializePlatforms();
    initializePickups();
    initializePlayer();
    initializeEnemies();

    initializeHUD();
    initializeOnScreenText();
}

function initializeBackground() {

    let transform;
    let artist;
    let sprite;

    for (let i = 0; i < GameData.BACKGROUND_DATA.length; i++) {

        artist = new ScrollingSpriteArtist(
            context,
            1,
            GameData.BACKGROUND_DATA[i].spriteSheet,
            GameData.BACKGROUND_DATA[i].sourcePosition,
            GameData.BACKGROUND_DATA[i].sourceDimensions,
            canvas.clientWidth,
            canvas.clientHeight
        );

        transform = new Transform2D(
            GameData.BACKGROUND_DATA[i].translation,
            GameData.BACKGROUND_DATA[i].rotation,
            GameData.BACKGROUND_DATA[i].scale,
            GameData.BACKGROUND_DATA[i].origin,
            new Vector2(
                canvas.clientWidth,
                canvas.clientHeight
            )
        );

        sprite = new Sprite(
            GameData.BACKGROUND_DATA[i].id,
            transform,
            GameData.BACKGROUND_DATA[i].actorType,
            GameData.BACKGROUND_DATA[i].collisionType,
            StatusType.Updated | StatusType.Drawn,
            artist,
            GameData.BACKGROUND_DATA[i].scrollSpeedMultiplier,
            GameData.BACKGROUND_DATA[i].layerDepth
        );

        objectManager.add(sprite);
    }

    // Sort all background sprites by depth 0 (back) -> 1 (front)
    objectManager.sort(
        ActorType.Background,
        function sortAscendingDepth(a, b) {
            return a.layerDepth - b.layerDepth;
        }
    );
}

function initializePlatforms() {

    let artist;
    let transform;

    let spriteArchetype;
    let spriteClone = null;

    artist = new SpriteArtist(
        context,
        1,
        GameData.PLATFORM_DATA.spriteSheet,
        GameData.PLATFORM_DATA.sourcePosition,
        GameData.PLATFORM_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.PLATFORM_DATA.rotation,
        GameData.PLATFORM_DATA.scale,
        GameData.PLATFORM_DATA.origin,
        GameData.PLATFORM_DATA.sourceDimensions,
        GameData.PLATFORM_DATA.explodeBoundingBoxInPixels
    );

    spriteArchetype = new Sprite(
        GameData.PLATFORM_DATA.id,
        transform,
        GameData.PLATFORM_DATA.actorType,
        GameData.PLATFORM_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.PLATFORM_DATA.scrollSpeedMultiplier,
        GameData.PLATFORM_DATA.layerDepth
    );

    // Check out the Constant.js file - it contains an object called
    // PLATFORM_DATA, which contains an array property called translationArray.
    // This translationArray simply contains a list of positions for where we
    // want to position the platforms on our screen. Take a look at this array
    // to understand more.
    for (let i = 0; i < GameData.PLATFORM_DATA.translationArray.length; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update id
        spriteClone.id = spriteClone.id + " " + i;

        // Update translation
        spriteClone.transform.setTranslation(GameData.PLATFORM_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(spriteClone);
    }
}

function initializePickups() {

    let artist;
    let transform;

    let spriteArchetype = null;
    let spriteClone = null;

    artist = new AnimatedSpriteArtist(
        context,                                        // Context

        // Don't be afraid to edit the alpha value! This allows you to make
        // certain objects transparent, opaque, or semi-transparent. The
        // range of values for alpha is [0, 1].
        1,

        GameData.COLLECTIBLES_ANIMATION_DATA            // Animation data
    );

    transform = new Transform2D(
        new Vector2(530, 250),                          // Translation
        0,                                              // Rotation
        Vector2.One,                                    // Scale
        Vector2.Zero,                                   // Origin
        artist.getBoundingBoxByTakeName("Gold Glint"),  // Dimensions

        // The explode by value determines how much bigger (or smaller) the
        // collision box should be for a particular sprite. Edit this value
        // to see what results you get. Make sure the debug mod is enabled
        // so that collision boxes are drawn on-screen.

        // It is important to note that the below explode by value must be
        // an even number. The explode by value can be positive (to make the 
        // sprite's collision box larger), or negative (to make the sprite's
        // collision box smaller). Leave the value as 0 if you would like 
        // the collision box to match the size of the sprite.
        0
    );

    spriteArchetype = new Sprite(
        "Gold",
        transform,
        ActorType.Pickup,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,

        // The below values (scroll speed multipler and layer depth) are
        // primarily used to create parallax effects. See the initialize
        // background function to get an idea of how they are used.

        1,          // Scroll speed multiplier
        1           // Layer depth
    );

    // Create 5 pickup sprites
    for (let i = 1; i <= 5; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        spriteClone.transform.translateBy(
            new Vector2(
                (i * 100),
                0
            )
        );

        // Set sprite take
        spriteClone.artist.setTake("Gold Glint");

        // Add to object manager
        objectManager.add(spriteClone);
    }
}

function initializePlayer() {

    let transform;
    let artist;
    let sprite;

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.RUNNER_ANIMATION_DATA                          // Animation Data
    );

    // Set animation
    artist.setTake("Idle");

    transform = new Transform2D(
        GameData.RUNNER_START_POSITION,                         // Translation
        0,                                                      // Rotation
        Vector2.One,                                            // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Idle"),                // Dimensions
        0                                                       // Explode By
    );

    // The moveable sprite is a sprite which has an attached physics body. The
    // attached physics body allows us to move the sprite in a particular way.
    // For example, we can apply velocity to the physics body, to move it in a
    // particular direction. If we apply a velocity in the -y direction, the 
    // physics body will move upwards. If we apply a velocity in the +x 
    // direction, the physics body will move to the left. The physics body, in
    // turn, moves the sprite. This is done by updating the position of the
    // sprite to match the position of the physics body. Additionally, forces
    // are automatically applied to the physics body every update. This 
    // includes gravity and friction. We can define how much gravity and how
    // much friction is applied to the physics body by setting those values
    // directly (see below an example of how this works). We can also set the
    // max speed of the physics body to define how fast we want to allow it to
    // move.

    sprite = new MoveableSprite(
        "Player",                                               // ID
        transform,                                              // Transform
        ActorType.Player,                                       // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    // Set characteristics of the body attached to the moveable sprite
    // Play around with these values and see what happens.
    sprite.body.maximumSpeed = 6;
    sprite.body.friction = FrictionType.Low;
    sprite.body.gravity = GravityType.Weak;

    // How could you change these values in-game?
    // You have two options - you could access them via a controller which is attached
    // to the player - or, you could access them via a manager (such as the game state
    // manager) by extracting the player sprite from the object manager (i.e., you could
    // use this.objectManager.get(ActorType.Player)). From there, you could update these
    // values.

    sprite.attachController(
        new PlayerMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            GameData.RUNNER_MOVE_KEYS,
            GameData.RUNNER_RUN_VELOCITY,
            GameData.RUNNER_JUMP_VELOCITY
        )
    );

    // Add sprite to object manager
    objectManager.add(sprite);
}

function initializeEnemies() {

    let transform;
    let artist;

    let sprite;

    artist = new AnimatedSpriteArtist(
        context,
        1,
        GameData.ENEMY_ANIMATION_DATA
    );

    artist.setTake("Wasp Fly");

    transform = new Transform2D(
        new Vector2(400, 200),
        0,
        new Vector2(1, 1),
        Vector2.Zero,
        artist.getBoundingBoxByTakeName("Wasp Fly"),
        0
    );

    sprite = new MoveableSprite(
        "Wasp",
        transform,
        ActorType.Enemy,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Set performance characteristics of the physics body that is
    // attached to the moveable sprite
    sprite.body.maximumSpeed = 6;
    sprite.body.friction = FrictionType.Normal;
    sprite.body.gravity = GravityType.Normal;

    // Attach a clickable object controller to the enemy sprite.
    // This allows the enemy sprite to become clickable. There is
    // no reason for our enemy sprite to become clickable, but 
    // this simply demonstrates how you can make objects in your
    // game clickable.
    sprite.attachController(
        new ClickableObjectController(
            mouseManager,

            // The clickable object controller takes a callback function as a
            // second argument to its constructor. This allows you to specify
            // what happens when the object is clicked. You can create an 
            // inline arrow function (like I have done below), or you could
            // create a seperate function using the following syntax...
            //
            // const yourFuncName = () => {
            //     Your code here...
            // }
            //
            // ...and could then pass 'yourFuncName' as the second parameter to 
            // this constructor.

            () => {

                // This function is executed when you click on the enemy
                // sprite...

                // Print out to the console
                console.log("You clicked on the enemy sprite!");

                // Play the 'boing' sound
                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["boing"]
                    )
                );

                // Change this code to suit your own project!
            }
        )
    );

    // TO DO: Add other controllers 
    // Add bee move controller...
    // Add bee shoot controller...

    // Add enemy to object manager
    objectManager.add(sprite);
}

// Hard-coded for demo purposes... you should not do this in
// your project! You shoud either initialize your sprite sheets
// in an initialize function (which is basic, but okay), or store
// them in the constants file (which is better!).
const uiSpriteSheet = document.getElementById("ui_sprite_sheet");

function initializeHUD() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(
            canvas.clientWidth - 40,
            10
        ),
        0,
        new Vector2(3, 3),
        Vector2.Zero,
        new Vector2(10, 10),
        0
    );

    artist = new SpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        uiSpriteSheet,                                  // Spritesheet
        Vector2.Zero,                                   // Source Position
        new Vector2(32, 32),                            // Source Dimension
        
        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                                            // Fixed Position
    );

    sprite = new Sprite(
        "Pause Button",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to the object manager
    objectManager.add(sprite);
}

function initializeOnScreenText() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(
            (canvas.clientWidth / 2 - 40), 
            10
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    artist = new TextSpriteArtist(
        context,                        // Context
        1,                              // Alpha
        "Go, go, go!",                  // Text
        FontType.InformationMedium,     // Font Type
        Color.White,                    // Color
        TextAlignType.Left,             // Text Align
        200,                            // Max Width

        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        false                            // Fixed Position
    );

    sprite = new Sprite(
        "Text UI Info",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to object manager
    objectManager.add(sprite);
}

function resetGame() {

    clearCanvas();
    startGame();
}

// Start the game once the page has loaded
window.addEventListener("load", start);