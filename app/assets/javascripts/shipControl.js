//Used to test ajax.
//saveUserState.sendUserScore(1000);
// Params: lives, bullets, score, difficulty
//saveUserState.sendUserSaveState(2, 27, 1337, 'hard');
game = function(lives, bullets, score, difficulty) {

var userPropertiesDefaults = {

    lives: lives,
    bullets: bullets,
    score: score,
    difficulty: difficulty

};

var gameProperties = {
    
    screenWidth: 640,
    screenHeight: 480
    
};

var states = {
    
    game: "game",
    
};

var graphicAssets = {
    
    ship:{URL:'/assets/player.png', name:'ship'},
    bullet:{URL:'/assets/theHoff.jpg', name:'bullet'},
    asteroidMedium:{URL:'/assets/medium.jpg', name:'medium'},
    asteroidSmall:{URL:'/assets/asteroid-small.png', name:'small'},
    asteroidLarge:{URL:'/assets/asteroid-big.png', name:'large'}
    
};

var shipProperties = {
    
    startX: gameProperties.screenWidth * 0.5,
    startY: gameProperties.screenHeight * 0.5,
    acceleration: 300,
    drag: 100,
    maxVelocity: 300,
    angularVelocity: 200,
    life: lives
    
};

var gameState = function (game){
    
    this.shipSprite;
    
    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;

    this.shootGroup;
    this.shootInterval = 0;

    this.asteroidGroup;
    this.asteroidCount = 3;

    this.shipLives = shipProperties.life;
    
};

var shootProperties = {

    speed: 400,
    interval: 250,
    lifespan: 2000,
    maxCount: 30,
    bullets: bullets

};

// Adding the HUD for the game
var bulletCounter = Math.floor(bullets / 10); 
var lifeCounter = Math.floor(lives);
userHUD();
function userHUD() {$(document).ready(function() {
  
  for (i=0; i < bulletCounter ; i++) {
    
    $('.bullets').after("<img src='/assets/theHoff.jpg' alt='The Hoff' class='bullet bullet" + (i + 1)  + "'></img>");
    
  }
  
  for (i=0; i < lives; i++) {
    
    $('.lives').after("<img src='/assets/player.png' alt='Player' class='life life" + (i + 1) + "'></img>");
    console.log("Lives: " + lives);
    
  }
})};

console.log("score: ", score);
gameState.prototype = {
    
    preload: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;       
        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
        game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
        game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);
        game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
        game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);

    },
    
    create: function () {
        
        this.initGraphics();
        this.initPhysics();
        this.initKeyboard();
        this.createAsteroid();
        
    },

    update: function () {
        
        this.checkPlayerInput();
        this.checkBoundaries(this.shipSprite);
        this.asteroidGroup.forEachExists(this.checkBoundaries, this);

        game.physics.arcade.overlap(this.shootGroup, this.asteroidGroup, this.asteroidCollision, null, this);
        game.physics.arcade.overlap(this.shipSprite, this.asteroidGroup, this.asteroidCollision, null, this);
    
    },
    
    initGraphics: function () {
        
        this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
        this.shipSprite.angle = -90;
        this.shipSprite.anchor.set(0.5, 0.5);
        
        this.shootGroup = game.add.group();
        this.asteroidGroup = game.add.group();
    
    },
    
    initPhysics: function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
        this.shipSprite.body.drag.set(shipProperties.drag);
        this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);
        
        this.shootGroup.enableBody = true;
        this.shootGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.shootGroup.createMultiple(shootProperties.maxCount, graphicAssets.bullet.name);
        this.shootGroup.setAll('anchor.x', 0.5);
        this.shootGroup.setAll('anchor.y', 0.5);
        this.shootGroup.setAll('lifespan', shootProperties.lifespan);

        this.asteroidGroup.enableBody = true;
        this.asteroidGroup.physics = Phaser.Physics.ARCADE;

    },
    
    initKeyboard: function() {
        
        this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    },
    
    checkPlayerInput: function () {
        
       if (this.key_left.isDown) {
            
           this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
        
       } else if (this.key_right.isDown) {
           
            this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
        
       } else {
       
           this.shipSprite.body.angularVelocity = 0;
        
       }
        
        if (this.key_thrust.isDown) {
       
            game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, 
            shipProperties.acceleration, this.shipSprite.body.acceleration);
        
        } else {
        
            this.shipSprite.body.acceleration.set(0);
        
        }

        if (this.key_fire.isDown) {

            this.fire(shootProperties.bullets);
            shootProperties.bullets -= 1;
            
        }
    },
    
    checkBoundaries: function (sprite) {
        
        
        if (sprite.x < 0) {
            
            sprite.x = game.width;
            
        } else if (sprite.x > game.width) {
            
            sprite.x = 0;
            
        }
        
        if (sprite.y < 0) {
            
            sprite.y = game.height;
            
        } else if (sprite.y > game.height) {
            
            sprite.y =0;
            
        }
    },

    fire: function (ammo) {

        if (ammo > 0) {
        
            if (game.time.now > this.shootInterval) {

            var bullet = this.shootGroup.getFirstExists(false);

                if (bullet) {

                    var lenght = this.shipSprite.width * 0.5;
                    var x = this.shipSprite.x + (Math.cos(this.shipSprite.rotation) * lenght);
                    var y = this.shipSprite.y + (Math.sin(this.shipSprite.rotation) * lenght);

                    bullet.reset(x, y);
                    bullet.lifespan = shootProperties.lifespan;
                    bullet.rotation = this.shipSprite.rotation;

                    game.physics.arcade.velocityFromRotation(this.shipSprite.rotation, shootProperties.speed, bullet.body.velocity);
                    this.shootInterval = game.time.now + shootProperties.interval;

                    console.log("ammo: ", ammo);
                    
                    $(".bullet" + bulletCounter).remove();
                    bulletCounter -=1;
                    
                }
            }
        }
    },

    asteroidSize: function() {

        min = Math.ceil(1);
        max = Math.floor(3);
        size = Math.floor(Math.random() * (max - min + 1)) + min;

        if (size == 1) {

            return graphicAssets.asteroidSmall.name;
    
        } else if (size == 2) {

            return graphicAssets.asteroidMedium.name;
    
        } else {

            return graphicAssets.asteroidLarge.name;
    
        }
    },

   asteroidAngularVelocity: function() {

        min = Math.ceil(0);
        max = Math.floor(200);
        return Math.floor(Math.random() * (max - min + 1)) + min;

   },

   asteroidAngle: function() {

        min = Math.ceil(0);
        max = Math.floor(180);
        return Math.floor(Math.random() * (max - min + 1)) + min;

   },

   asteroidVelocity: function() {

        min = Math.ceil(50);
        max = Math.floor(150);
        return Math.floor(Math.random() * (max - min +1)) + min;

   },

    createAsteroid: function(x, y) {

        var asteroid = this.asteroidGroup.create(x, y, this.asteroidSize());
        asteroid.anchor.set(0.5, 0.5);
        asteroid.body.angularVelocity = this.asteroidAngularVelocity();

        var randomAngle = this.asteroidAngle();
        var randomVelocity = this.asteroidVelocity();

        game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);

    
    },

    resetAsteroids: function () {

        for (var i =0; i < this.asteroidCount; i++) {

            var side = Math.round(Math.random());
            var x;
            var y;

            if (side) {

                x = Math.round(Math.random()) * gameProperties.screenWidth;
                y = Math.random() * gameProperties.screenHeight;

            } else {

                x = Math.random() * gameProperties.screenWidth;
                y = Math.round(Math.random()) * gameProperties.screenHeight;

            }

            this.createAsteroid(x, y);

        }

    },

    asteroidCollision: function (target, asteroid) {

        target.kill();
        asteroid.kill();

        if (size == 1) {

            score += 10;
            size = "small";

        } else if (size == 2) {

            score += 20;
            size = "medium";

        } else {

            score += 30;
            size = "large";

        }

        console.log("score: ", score, "size: ", size);

        if (target.key = graphicAssets.ship.name) {
            
            this.destroyShip();
            
        }
    },

    resetShip: function() {

        this.shipSprite.reset(shipProperties.startX, shipProperties.startY);
        this.shipSprite.angle = -90;

    },

    destroyShip: function () {

        this.shipLives -= 1;

        if (this.shipLives) {

            this.resetShip();
            

        }
        //TODO add remove life
            $(".life" + lifeCounter).remove();
            lifeCounter -= 1;
            console.log("lost a life! " + lifeCounter);

        console.log(this.shipLives);

    } 
    
};



var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.game, gameState);
game.state.start(states.game);
}

game(3, 30, 0, 'normal');