
class GameData {
  static AUDIO_CUE_ARRAY = [
    new AudioCue("background", AudioType.Background, 1, 1, 0, true),
    new AudioCue("jump", AudioType.Move, 1, 1, 0, false),
    new AudioCue("boing", AudioType.All, 1, 1, 0, false),
    new AudioCue("game_over", AudioType.WinLose, 1, 1, 0, false),
  ];

  static BACKGROUND_DIMENSIONS = new Vector2(384, 216);

  static BACKGROUND_DATA = [

    {
      id: "Background 1",
      spriteSheet: document.getElementById("snailbait_background_1"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      collisionType: CollisionType.NotCollidable,
      layerDepth: 0,
      scrollSpeedMultiplier: 0.2
    },

    {
      id: "Background 2",
      spriteSheet: document.getElementById("snailbait_background_2"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.1,
      scrollSpeedMultiplier: 0.15
    },

    {
      id: "Background 3",
      spriteSheet: document.getElementById("snailbait_background_3"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.15,
      scrollSpeedMultiplier: 0.1
    },

    {
      id: "Background 4",
      spriteSheet: document.getElementById("snailbait_background_4"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.2,
      scrollSpeedMultiplier: 0.05
    },

    {
      id: "Background 5",
      spriteSheet: document.getElementById("snailbait_background_5"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.25,
      scrollSpeedMultiplier: 0.01
    }
  ];

  static PLATFORM_DATA = {
    id: "Platform",
    spriteSheet: document.getElementById("snailbait_jungle_tileset"),
    sourcePosition: new Vector2(0, 112),
    sourceDimensions: new Vector2(48, 48),
    rotation: 0,
    scale: Vector2.One,
    origin: Vector2.Zero,
    actorType: ActorType.Platform,
    collisionType: CollisionType.Collidable,
    layerDepth: 0,
    explodeBoundingBoxInPixels: -6,

    // We have just one platform sprite, so it makes sense to
    // store a list of positions at which we want to place that
    // sprite in our game world. Mess around with these values
    // by either adding or removing positions from our array, or
    // by editing the x, y values of each position. Check out the 
    // results by refreshing the web page!
    translationArray: [

      /****************** Screen 1 *******************/

      // Middle Low
      new Vector2(200, 370),
      new Vector2(250, 370),
      new Vector2(300, 370),
      new Vector2(350, 370),

      // Middle High
      new Vector2(250, 240),
      new Vector2(300, 240),

      // Middle Right
      new Vector2(450, 300),
      new Vector2(500, 300),
      new Vector2(550, 300),
      new Vector2(600, 300),

      // Floor
      new Vector2(0, 420),
      new Vector2(50, 420),
      new Vector2(100, 420),
      new Vector2(150, 420),
      new Vector2(200, 420),
      new Vector2(250, 420),
      new Vector2(300, 420),
      new Vector2(350, 420),
      new Vector2(400, 420),
      new Vector2(450, 420),
      new Vector2(500, 420),
      new Vector2(550, 420),
      new Vector2(600, 420),
      new Vector2(650, 420),
      new Vector2(700, 420),
      new Vector2(750, 420),
      new Vector2(800, 420),

      /****************** Screen 2 *******************/

      // Floor
      new Vector2(850, 420),
      new Vector2(900, 420),
      new Vector2(950, 420),
      new Vector2(1000, 420),
      new Vector2(1050, 420),
      new Vector2(1100, 420),
      new Vector2(1150, 420),
      new Vector2(1200, 420),

      // GAP!

      new Vector2(1400, 420),
      new Vector2(1450, 420),
      new Vector2(1500, 420),
      new Vector2(1550, 420),
      new Vector2(1600, 420),
      new Vector2(1650, 420),
      new Vector2(1700, 420),
      new Vector2(1750, 420),
    ]
  };

  static COLLECTIBLES_ANIMATION_DATA = {
    id: "Collectibles Animation Data",
    spriteSheet: document.getElementById("snailbait_sprite_sheet"),

    // List of animations
    takes: {

      // Animation 1
      "Sapphire Glint": {

        frameRatePerSec: 6,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 4,

        boundingBoxDimensions: new Vector2(30, 35),

        frames: [
          new Rect(185, 138, 30, 35), // Frame 1
          new Rect(220, 138, 30, 35), // Frame 2
          new Rect(258, 138, 30, 35), // Frame 3
          new Rect(294, 138, 30, 35), // Frame 4
          new Rect(331, 138, 30, 35)  // Frame 5
        ]
      },

      // Animation 2
      "Ruby Glint": {

        frameRatePerSec: 6,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 4,

        boundingBoxDimensions: new Vector2(30, 35),

        frames: [
          new Rect(3, 138, 30, 35),
          new Rect(39, 138, 30, 35),
          new Rect(76, 138, 30, 35),
          new Rect(112, 138, 30, 35),
          new Rect(148, 138, 30, 35)
        ]
      },

      // Animation 3
      "Gold Glint": {

        frameRatePerSec: 6,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 2,

        boundingBoxDimensions: new Vector2(30, 30),

        frames: [
          new Rect(65, 540, 30, 30),
          new Rect(96, 540, 30, 30),
          new Rect(128, 540, 30, 30)
        ]
      }
    }
  };

  static RUNNER_START_POSITION = new Vector2(80, 250);
  static RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];
  static RUNNER_RUN_VELOCITY = 0.1;
  static RUNNER_JUMP_VELOCITY = 0.6;

  static RUNNER_ANIMATION_DATA = {

    id: "Runner Animation Data",
    spriteSheet: document.getElementById("snailbait_sprite_sheet"),

    // Animations
    takes: {

      // Animation 1
      "Idle": {

        frameRatePerSec: 2,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 0,

        // Notice that I chose the largest of all the widths taken from the frames
        // array below
        boundingBoxDimensions: new Vector2(49, 54),

        frames: [

          // This list of rects just represent the positions
          // and dimension of each individual animation frame
          // on the sprite sheet
          new Rect(96, 385, 46, 54),    // Animation frame 2
        ]
      },

      // Animation 2
      "Run Left": {

        frameRatePerSec: 12,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 8,

        // Notice that I chose the largest of all the widths taken from the frames
        // array below
        boundingBoxDimensions: new Vector2(49, 54),

        frames: [
          new Rect(0, 305, 47, 54),     // Animation frame 1
          new Rect(55, 305, 44, 54),    // Animation frame 2
          new Rect(107, 305, 39, 54),   // Animation frame 3
          new Rect(152, 305, 46, 54),   // Animation frame 4
          new Rect(208, 305, 49, 54),   // Animation frame 5
          new Rect(265, 305, 46, 54),   // Animation frame 6
          new Rect(320, 305, 42, 54),   // Animation frame 7
          new Rect(380, 305, 35, 54),   // Animation frame 8
          new Rect(425, 305, 35, 54)    // Animation frame 9
        ]
      },

      // Animation 3
      "Run Right": {

        frameRatePerSec: 12,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 8,

        // Notice that I chose the largest of all the widths taken from the frames
        // array below
        boundingBoxDimensions: new Vector2(49, 54),

        frames: [

          // This list of rects just represent the positions
          // and dimension of each individual animation frame
          // on the sprite sheet

          new Rect(414, 385, 47, 54),   // Animation frame 1
          new Rect(362, 385, 44, 54),   // Animation frame 2
          new Rect(314, 385, 39, 54),   // Animation frame 3
          new Rect(265, 385, 46, 54),   // Animation frame 4
          new Rect(205, 385, 49, 54),   // Animation frame 5
          new Rect(150, 385, 46, 54),   // Animation frame 6
          new Rect(96, 385, 46, 54),    // Animation frame 7
          new Rect(45, 385, 35, 54),    // Animation frame 8
          new Rect(0, 385, 35, 54)      // Animation frame 9
        ]
      },
    }
  };

  static ENEMY_ANIMATION_DATA = {

    id: "Enemy Animation Data",
    spriteSheet: document.getElementById("snailbait_sprite_sheet"),
    
    // Animations
    takes: {

      // Animation 1
      "Wasp Fly": {

        frameRatePerSec: 10,
        
        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 2,

        boundingBoxDimensions: new Vector2(35, 50),

        frames: [
          new Rect(20, 234, 35, 50),
          new Rect(90, 234, 35, 50),
          new Rect(160, 234, 35, 50)
        ]
      }
    }
  };
}

const FontType = {
  InformationSmall: "12px Arial",
  InformationMedium: "18px Arial",
  InformationLarge: "24px Arial"
};