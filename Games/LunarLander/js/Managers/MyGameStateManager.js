const GameStates = {
    Play: "Play",
    Pause: "Pause",
}
class MyGameStateManager extends GameStateManager {

    get shipFuel() {
        return this._shipFuel;
    }

    get playerScore() {
        return this._playerScore;
    }

    set shipFuel(value) {
        this._shipFuel = value;
    }

    set playerScore(value) {
        this._playerScore = value;
    }

    constructor(id, notificationCenter, initialShipFuel, perfectLandingSpeed, perfectLandingRotation, safeLandingSpeed, safeLandingRotation) {
        super(id);

        this.notificationCenter = notificationCenter;

        this.shipFuel = initialShipFuel;
        this.playerScore = 0;
        this.safeLandingSpeed = safeLandingSpeed;
        this.safeLandingRotation = safeLandingRotation;
        this.perfectLandingSpeed = perfectLandingSpeed;
        this.perfectLandingRotation = perfectLandingRotation;
        this.gameState = GameStates.Pause;

        this.registerForNotifications();
    }

    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.GameState,
            this,
            this.handleGameStateNotification
        );
    }

    handleGameStateNotification(notification) {
        switch (notification.notificationAction) {
            case NotificationAction.UpdateFuel:
                this.handleFuelStateChange(notification.notificationArguments);
                break;

            case NotificationAction.Land:
                this.handleLand(notification.notificationArguments);
                break;

            case NotificationAction.Crash:
                this.handleCrash();
                break;

            case NotificationAction.Play:
                this.gameState = GameStates.Play;
                break;

            case NotificationAction.Pause:
                this.gameState = GameStates.Pause;
                break;

            case NotificationAction.Reset: {
                this.handleShipReset();
                break;
            }

            case NotificationAction.Win: 
                this.handleWin();
                break;

            default:
                break;
        }
    }

    handleFuelStateChange(argArray) {
        this._shipFuel += argArray[0];
        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateFuel,
                [this.shipFuel]
            )
        );
    }

    handleLand(argArray) {
        let body = argArray[0];
        let multiplier = argArray[1];

        if (body.velocityY > this.safeLandingSpeed
            || body.facingX < this.safeLandingRotation) {
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.GameState,
                    NotificationAction.Crash
                )
            )
        } else {
            let landingScore = 100 * multiplier / 2;
            let perfectLanding = false;

            if (body.velocityY < this.perfectLandingSpeed
                && body.facingX > this.perfectLandingRotation) {
                    landingScore = 100 * multiplier;
                    perfectLanding = true;

                    this.notificationCenter.notify(
                        new Notification(
                            NotificationType.GameState,
                            NotificationAction.UpdateFuel,
                            [50]
                        )
                    );
            }
            this._playerScore += landingScore;

            this.notificationCenter.notify(
                new Notification(
                    NotificationType.GameState,
                    NotificationAction.Pause
                )
            );

            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Pause,
                    ["rocket"]
                )
            )

            this.notificationCenter.notify(
                new Notification(
                    NotificationType.UI,
                    NotificationAction.Land,
                    [this.playerScore]
                )
            )
            
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.Land,
                    [landingScore, 
                    perfectLanding]
                )
            )
        }
    }

    handleCrash() {
        this._shipFuel -= 100;

        this.notificationCenter.notify(
            new Notification(
                NotificationType.GameState,
                NotificationAction.Pause
            )
        );

        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sound,
                NotificationAction.Pause,
                ["rocket"]
            )
        );

        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sound,
                NotificationAction.Play,
                ["explosion"]
            )
        );

        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Player]
            )
        );


        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateFuel,
                [this.shipFuel]
            )
        );

        this.notificationCenter.notify(
            new Notification(
                NotificationType.Menu,
                NotificationAction.Crash
            )
        )
    }

    handleShipReset() {

        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Player]
            )
        );

        initializeShip();

        if (this.shipFuel > 0) {
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.GameState,
                    NotificationAction.Play
                )
            );
        } else {
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.GameState,
                    NotificationAction.Win
                )
            )
        }
    }

    handleWin() {
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Menu,
                NotificationAction.Win,
                [this._playerScore]
            )
        );

        this._playerScore = 0;
        this._shipFuel = GameData.SHIP_START_FUEL;

        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.UpdateFuel,
                [this._shipFuel]
            )
        );

        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.Land,
                [this._playerScore]
            )
        );
    }



    update(gameTime) {
        
    }
}
