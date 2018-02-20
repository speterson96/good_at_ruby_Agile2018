var gameProperties = {
    
    screenWidth: 640,
    screenHeight: 480,
    
};

var states = {
    
    game: "game",
    
};

var graphicAssets = {
    
    ship:{URL:'../assets/theHoff.jpg', name:'ship'},
    
};

var shipProperties = {
    startX: gameProperties.screenWidth * 0.5,
    startY: gameProperties.screenHeight * 0.5,
    acceleration: 300,
    drag: 100,
    maxVelocity: 300,
    angularVelocity: 200,
    
};

var gameState = function (game){
    this.shipSprite;
    
    this.mouse_left;
    this.mouse_right;
    this.mouse_thrust;
    
};

gameState.prototype = {
    
    preload: function () {
       
        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
    },
    
    create: function () {
        
        this.initGraphics();
        this.initPhysics();
        this.initMouse();
        
    },

    update: function () {
        
    },
    
    initGraphics: function () {
        this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
        this.shipSprite.angle = -90;
        this.shipSprite.anchor.set(0.5, 0.5);
    },
    
    initPhysics: function() {
        
        game.physics.startSystem(Phaser.Physics.Arcade);
        
        game.physics.enable(this.shipSprite, Phaser.Physics.Arcade);
        this.shipSprite.body.drag.set(shipProperties.drag);
        this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);
        
    },
    
    initMouse: function() {
        
        this.mouse_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.mouse_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.mouse_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
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
            game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
        } else {
            this.shipSprite.body.acceleration.set(0);
        }
    },  
        
    },
    
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.game, gameState);
game.state.start(states.game);