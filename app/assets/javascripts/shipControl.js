var gameProperties = {
    
    screenWidth: 640,
    screenHeight: 480
    
};

var states = {
    
    game: "game",
    
};

var graphicAssets = {
    
    ship:{URL:'/assets/ship.png', name:'ship'},
    bullet:{URL:'/assets/theHoff.jpg', name:'bullet'}
    
};

var shipProperties = {
    
    startX: gameProperties.screenWidth * 0.5,
    startY: gameProperties.screenHeight * 0.5,
    acceleration: 300,
    drag: 100,
    maxVelocity: 300,
    angularVelocity: 200
    
};

var gameState = function (game){
    
    this.shipSprite;
    
    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;

    this.shootGroup;
    this.shootInterval = 0;
    
};

var shootProperties = {

    speed: 400,
    interval: 250,
    lifespan: 2000,
    maxCount: 30

};

gameState.prototype = {
    
    preload: function () {
       
        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
        game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
    },
    
    create: function () {
        
        this.initGraphics();
        this.initPhysics();
        this.initKeyboard();
        
    },

    update: function () {
        
        this.checkPlayerInput();
        this.checkBoundaries(this.shipSprite);

        
    },
    
    initGraphics: function () {
        
        this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
        this.shipSprite.angle = -90;
        this.shipSprite.anchor.set(0.5, 0.5);
        
        this.shootGroup = game.add.group();
    
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

            this.fire();

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

    fire: function () {

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
            }

        }

    }
    
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, '#gameDiv');
game.state.add(states.game, gameState);
game.state.start(states.game);
