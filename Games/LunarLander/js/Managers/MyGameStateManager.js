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

    constructor(id, notificationCenter, initialShipFuel) {
        super(id);

        this.notificationCenter = notificationCenter;

        this.shipFuel = initialShipFuel;
        this.playerScore = 0;

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
                this.handleWin(notification.notificationArguments);
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

    handleLand(argArray) {}

    update(gameTime) {
        
    }
}
