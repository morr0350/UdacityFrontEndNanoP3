var Game = function() {

    this.score = 0;
    this.winningScore = 10;
    this.rows = [];
    var rowHeight = 83;
    var rowOffset = 22;
    for (var i = 0; i < 6; i++) {
        this.rows[i] = (rowHeight * i) - rowOffset;
    }
};

Game.prototype.displayScore = function() {
    ctx.font = "20px Arial";
    ctx.clearRect(425, 25, 100, 20);
    ctx.fillText("Score: " + this.score, 425, 45);
};

Game.prototype.displayWarning = function() {
    ctx.font = "20px Arial";
    ctx.clearRect(425, 25, 100, 20);
    ctx.fillText("C'MON!", 425, 45);
};


// Superclass for all characters in the game
var Character = function(startX, startY, sprite) {
    this.x = startX;
    this.y = startY;
    this.sprite = sprite;
};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(dt) {

};

Character.prototype.getCenterCoords = function() {
    var avgCharacterWidth = 101;
    var avgCharacterHeight = 212;
    var centerX = this.x + (avgCharacterWidth / 2);
    var centerY = this.y + (avgCharacterHeight / 2);
    return [centerX, centerY];
};

// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var imageSpritePath = 'images/enemy-bug.png';
    this.speed = speed;

    Character.call(this, initialX, initialY, imageSpritePath);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = -1 * (505 / 5);
    } else {
        this.x += this.speed * dt;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var imageSpritePath = 'images/char-boy.png';

    Character.call(this, playerInitialX, playerInitialY, imageSpritePath);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function (dt) {
    if (this.y < -10) {
        game.score++;
        game.displayScore();
        if (game.score >= game.winningScore) {
            alert("You won!");
            game.score = 0;
            game.displayScore();
        }
        this.reset();
    }
};

// Sends player back to initial staring position
Player.prototype.reset = function() {
    this.x = playerInitialX;
    this.y = playerInitialY;
}

Player.prototype.handleInput = function(direction) {

    switch (direction) {
        case "left":
            if (this.x > 0) {
                this.x -= 20;
            }
            break;
        case "up":
            this.y -= 20;
            break;
        case "right":
            if (this.x < 405) {
                this.x += 20;
            }
            break;
        case "down":
            if (this.y < 424) {
                this.y += 20;
            }
            break;
    }
};


// Now instantiate your objects.
var game = new Game();
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(101, game.rows[1], 20);
var enemy2 = new Enemy(301, game.rows[1], 20);
var enemy3 = new Enemy(-51, game.rows[1], 20);

var enemy4 = new Enemy(-100, game.rows[2], 30);
var enemy5 = new Enemy(150, game.rows[2], 30);
var enemy6 = new Enemy(-275, game.rows[2], 30);

var enemy7 = new Enemy(-275, game.rows[3], 40);
var enemy8 = new Enemy(-50, game.rows[3], 40);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

var playerInitialX = 2 * (101);
var playerInitialY = 4 * (101);

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
