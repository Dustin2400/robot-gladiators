var playerName = window.prompt("What is your robot's name")
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0){
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        if (enemyHealth <= 0) {
            window.alert(enemyName + " had died!");
            break;
        }
        var promptFight = window.prompt("would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose");
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                playerMoney = playerMoney -10;
                console.log("playerMoney", playerMoney);
                break;
            } else {
                fight();
            }
        }
        if (promptFight === "fight" || promptFight === "FIGHT") {
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            playerHealth = playerHealth - enemyAttack;
            
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
            
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                playerMoney = playerMoney + 20;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
            
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } else {
            window.alert ("You need to choose a valid option. Try again!");
        }
    }
};

var startGame = function() {

    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i=0; i < enemyNames.length; i++) {
        if (playerHealth > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {   
                    shop();
                }    
            }
        }else{
            window.alert("You have lost your robot in battle! Game Over!");
        }
    }
    endGame();
}

var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You have a score of " + playerMoney + " .");
    } else {
        window.alert("You've lost your robot in battle.");
    }
    window.alert("The game has ended. Let's see how you did.");
    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }

}

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or Leave the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "REFILL":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE":
        case "leave":
            window.alert("leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option.");
            shop();
            break;
    }
}

startGame();