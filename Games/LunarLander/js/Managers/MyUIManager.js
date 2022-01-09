class MyUIManager extends UIManager {

    constructor(id, notificationCenter, objectManager, mouseManager) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.mouseManager = mouseManager;

        this.registerForNotifications();
    }

    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.UI,
            this,
            this.handleUINotification
        );
    }

    handleUINotification(notification) {
        
        switch (notification.notificationAction) {
            case NotificationAction.UpdateFuel:
                this.updateFuel(notification.notificationArguments[0]);
                break;

            case NotificationAction.Land:
                this.updateScore(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
    }

    updateFuel(fuel) {
        const hudSprites = this.objectManager.get(ActorType.HUD);

        for (let i = 0; i < hudSprites.length; i++) {
            const hudSprite = hudSprites[i];

            if (hudSprite.id === "Text UI Fuel") {
                if (fuel < 0) {
                    hudSprite.artist.text = "Fuel: 0";
                } else {
                    hudSprite.artist.text = "Fuel: " + Math.floor(fuel);
                }
                
            }
        }

    }

    updateScore(score) {
        const hudSprites = this.objectManager.get(ActorType.HUD);

        for (let i = 0; i < hudSprites.length; i++) {
            const hudSprite = hudSprites[i];

            if (hudSprite.id === "Text UI Score") {

                hudSprite.artist.text = "Score: " + Math.floor(score);
            }
        }
    }

    update(gameTime) {
        
    }
}