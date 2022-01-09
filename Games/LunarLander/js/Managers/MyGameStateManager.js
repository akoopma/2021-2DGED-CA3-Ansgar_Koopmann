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
                this.handleReset();
                break;
            }

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

        console.log(body.facingX);
        console.log(body.velocityY);

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

    handleReset() {
        this.notificationCenter.notify(
            new Notification(
                NotificationType.Sprite,
                NotificationAction.RemoveAllByType,
                [ActorType.Player]
            )
        );
        initializeShip();

        this.notificationCenter.notify(
            new Notification(
                NotificationType.GameState,
                NotificationAction.Play
            )
        );
    }

    update(gameTime) {

    }
}
