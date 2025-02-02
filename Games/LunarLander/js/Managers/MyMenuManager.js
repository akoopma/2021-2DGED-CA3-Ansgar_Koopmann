class MyMenuManager extends MenuManager {

    static audioActive = true;

    constructor(id, notificationCenter, keyboardManager) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;

        this.initialize();

        // Register this object for notifications
        this.registerForNotifications();
    }

    registerForNotifications() {

        // When a 'menu' event fires, call the 'handleMenuNotification' function of 'this' object
        this.notificationCenter.register(
            NotificationType.Menu,
            this,
            this.handleMenuNotification
        );
    }

    handleMenuNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.ShowMenuChanged:

                this.showMenu(notification.notificationArguments[0]);
                break;

            case NotificationAction.Crash: 
                this.handleCrash();
                break;

            case NotificationAction.Land:
                this.handleLand(notification.notificationArguments);
                break;

            case NotificationAction.Win:
                this.handleWin(notification.notificationArguments);
                break;

            default:
                break;
        }
    }

    showMenu(statusType) {

        // Check out the initialize function of this class. In it, we create a 'Menu' notification
        // whenever the play button is pressed. This notification has an action of ShowMenuChanged,
        // and an argument of [StatusType.Updated | StatusType.Drawn]. The handleMenuNotification 
        // function of this class is registered to the 'Menu' event. So, it will be called whenever
        // a 'Menu' notification is created. In the handleMenuNotification, we call this showMenu
        // function if the notification's action is of type 'ShowMenuChanged'. We also pass through 
        // the parameters that were added to the notification - [StatusType.Updated | StatusType.Drawn] 
        // in our case.

        // So, the statusType that is passed to this function will ultimately be [StatusType.Updated |
        // StatusType.Drawn] (or simply '3', if we work it out). 

        // This means, that when the user presses the 'play' button, a ShowMenuChanged notification is
        // created, which ultimately tells this function to hide the menu. On the other hand, we could
        // tell this notification to show the menu, by creating another ShowMenuChanged notification, but
        // by passing through a StatusType of off.

        // The reason why we use [StatusType.Drawn | StatusType.Updated] to turn off the menu, and 
        // [StatusType.Off] to turn on the menu, is because the same notification is sent to the
        // object manager, which ultimately tells it to start Updating and Drawing if the menu is
        // turned off, or to stop Updating and Drawing if the menu is turned on. Here we see how
        // one notification may be used to control multiple separate elements.

        // If we created an event to tell the ObjectManager to draw and update,
        // then it means we want the game to run i.e. hide the menu
        if (statusType != 0) {

            $('#main_menu').hide();
        }

        else {

            $('#main_menu').show();
        }
    }

    initialize() {

        // Hide the exit menu
        $('#exit_menu').hide();
        $('#exit_menu').addClass('hidden');
        $('#land_menu').hide();
        $('#land_menu').addClass('hidden');
        $('#crash_menu').hide();
        $('#crash_menu').addClass('hidden');
        $('#mission_complete_menu').hide();
        $('#mission_complete_menu').addClass('hidden');


        // Hide the YOUR_MENU menu
        // $('#YOUR_MENU_ID').hide();
        // $('#YOUR_MENU_ID').addClass('hidden');

        // If the play button is clicked
        $('.play').click(function () {

            // Hide the menu
            $('#main_menu').hide();

            // Send a notification to update and draw the game
            notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.ShowMenuChanged,
                    [StatusType.Updated | StatusType.Drawn]
                )
            );
        });

        // If the audio button is clicked
        // Or more specifically - if an element which has
        // the audio class is clicked
        $('#audio_button').click(function () {

            if (MyMenuManager.audioActive) {
                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.SetVolume,
                        [
                            "rocket",
                            0
                        ]
                    )
                );

                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.SetVolume,
                        [
                            "explosion",
                            0
                        ]
                    )
                );
            } else {
                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.SetVolume,
                        [
                            "rocket",
                            0.4
                        ]
                    )
                );

                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.SetVolume,
                        [
                            "explosion",
                            0.4
                        ]
                    )
                );
            }

            MyMenuManager.audioActive = !MyMenuManager.audioActive;
        });

        // If the exit button is clicked
        $('.exit').click(function () {

            // Show exit menu
            $('#exit_menu').show();
            $('#exit_menu').removeClass('hidden');
        });

        $('.continue').click(function () {

            $('#temp').remove();

            $('#crash_menu').hide();
            $('#crash_menu').addClass('hidden');

            $('#land_menu').hide();
            $('#land_menu').addClass('hidden');

            notificationCenter.notify(
                new Notification(
                    NotificationType.GameState,
                    NotificationAction.Reset
                )
            )
        });

        $('.end_round').click(function () {

            $('#temp').remove();
            $('#mission_complete_menu').hide();
            $('#mission_complete_menu').addClass('hidden');

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
        });

    }

    handleCrash() {
        $('#crash_menu').show();
        $('#crash_menu').removeClass('hidden');
    }

    handleLand(argArray) {

        let landingScore = argArray[0];
        let perfectLanding = argArray[1];

        if (perfectLanding) {
            land_menu_text.innerText = "Perfect landing. Gained " + landingScore + " points";
            $("#land_menu").append("<h1 id='temp'>50 Fuel restored</h1>");
        } else {
            land_menu_text.innerText = "Safe Landing gained " + landingScore + " points";
        }

        $('#land_menu').show();
        $('#land_menu').removeClass('hidden');
    }

    handleWin(score) {
        
        $("#mission_complete_text").append("<h1 id='temp'>Final Score: " + score);
        $('#mission_complete_menu').show();
        $('#mission_complete_menu').removeClass('hidden');
    }

    update(gameTime) {

        // TO DO: Add code to listen for a 'pause key' press, and show/hide the menu accordingly
    }
}