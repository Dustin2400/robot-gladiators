var getPlayerName = function() {
    var name = " ";
    name = window.prompt("What is your robot's name?");
    while (name === null || name === "") {
        name = window.prompt("What is your robot's name?");
    }
    window.alert("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >=7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}

var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to Fight or Skip this fight? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();
    if ( promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        if (promptFight === "" || promptFight === null) {
            window.alert("You need to provide a valid answer! Please try again.");
            return fightOrSkip();
        }
        
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            playerInfo.Money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
}

var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0){
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
        if (enemy.health <= 0) {
            window.alert(enemy.name + " had died!");
            break;
        }
        if(fightOrSkip()){
            break;
        }
        if (promptFight === "fight" || promptFight === "FIGHT") {
            var damage = randomNumber((playerInfo.attack - 3), playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } else {
            window.alert ("You need to choose a valid option. Try again!");
        }
    }
};

var startGame = function() {

    playerInfo.reset();

    for(var i=0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            debugger;
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40,60);
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemy.names.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You have a score of " + playerInfo.money + " .");
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
            playerInfo.refillHealth();
            break;
        case "REFILL":
        case "upgrade":
            playerInfo.upgradeAttack();
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

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
]

startGame();