PLAY = 1
END = 0
var gamestate = PLAY

function preload() {
    player_biking = loadAnimation("mainPlayer1.png", "mainPlayer2.png")
    street = loadImage("Road.png")
    girl1_biking = loadAnimation("opponent1.png", "opponent2.png")
    girl2_biking = loadAnimation("opponent4.png", "opponent5.png")
    boy1_biking = loadAnimation("opponent7.png", "opponent8.png")
    obj1 = loadImage("obstacle1.png")
    obj2 = loadImage("obstacle2.png")
    obj3 = loadImage("obstacle3.png")
    player_dy = loadAnimation("mainPlayer3.png")
    girl1_dy = loadAnimation("opponent3.png")
    girl2_dy = loadAnimation("opponent6.png")
    boy1_dy = loadAnimation("opponent9.png")
}

function setup() {
    createCanvas(1350,200)

    pavement = createSprite(0, 100, 1350, 200)
    pavement.addImage("street", street)
    pavement.velocityX = -5
    pavement.x = pavement.width / 2
    player = createSprite(35, 180, 35, 15)
    player.addAnimation("biking", player_biking)
    player.scale = 0.05
    purplegroup = new Group()
    yellowgroup = new Group()
    redgroup = new Group()
    conegroup = new Group()
    holegroup = new Group()
    nailgroup = new Group()
}

function draw() {
    background("black")
    drawSprites()

    if(gamestate == PLAY) {
        if(pavement.x <= 0) {
            pavement.x = pavement.width / 2
        }
        if(keyDown("up")&& player.y > 0) {
            player.y = player.y - 10
            //boop.play()
        }
        if(keyDown("down")&& player.y < 200) {
            player.y = player.y + 10
            //boop.play()
        }
        if(keyDown("right")) {
            player.x = player.x + 10
            //boop.play()
        }

        colours = Math.round(random(1,3))
        if (frameCount% 150==0) {
            switch(colours) {
                case 1: purplegirl()
                break;
                case 2: yellowgirl()
                break;
                case 3: redboy()
                break;
            }
        }

        shapes = Math.round(random(1,3))
        if (frameCount% 100==0) {
            switch(shapes) {
                case 1: cone1()
                break;
                case 2: hole()
                break;
                case 3: nail()
                break;
            }
        }

        if(purplegroup.isTouching(player)) {
            girl1.addAnimation("dy", girl1_dy)
            gamestate = END
            girl1.velocityY = 0
        }
        if(yellowgroup.isTouching(player)) {
            girl2.addAnimation("dy", girl2_dy)
            gamestate = END
            girl2.velocityY = 0
        }
        if(redgroup.isTouching(player)) {
            boy1.addAnimation("dy", boy1_dy)
            gamestate = END
            boy1.velocityY = 0
        }
    }
    
    if(gamestate == END) {
        pavement.velocityX = 0
        player.addAnimation("de", player_dy)
        purplegroup.setVelocityXEach(0)
        yellowgroup.setVelocityXEach(0)
        redgroup.setVelocityXEach(0)
        purplegroup.setLifetimeEach(-1)
        yellowgroup.setLifetimeEach(-1)
        redgroup.setLifetimeEach(-1)
        conegroup.setVelocityXEach(0)
        holegroup.setVelocityXEach(0)
        nailgroup.setVelocityXEach(0)
        conegroup.setLifetimeEach(-1)
        holegroup.setLifetimeEach(-1)
        nailgroup.setLifetimeEach(-1)
    }
}

function purplegirl() {
    girl1 = createSprite(1350, Math.round(random(50, 200)))
    girl1.addAnimation("cycling", girl1_biking)
    girl1.scale = 0.05
    girl1.velocityX = -5
    purplegroup.add(girl1)
}
function yellowgirl() {
    girl2 = createSprite(1350, Math.round(random(50, 200)))
    girl2.addAnimation("beeking", girl2_biking)
    girl2.scale = 0.05
    girl2.velocityX = -5
    yellowgroup.add(girl2)
}
function redboy() {
    boy1 = createSprite(1350, Math.round(random(50, 200)))
    boy1.addAnimation("ceekling", boy1_biking)
    boy1.scale = 0.05
    boy1.velocityX = -5
    redgroup.add(boy1)
}

function cone1() {
    ob1 = createSprite(1350, Math.round(random(50, 200)))
    ob1.addImage("obstacle1", obj1)
    ob1.scale = 0.05
    ob1.velocityX = -5
    conegroup.add(ob1)
}
function hole() {
    ob2 = createSprite(1350, Math.round(random(50, 200)))
    ob2.addImage("obstacle2", obj2)
    ob2.scale = 0.05
    ob2.velocityX = -5
    holegroup.add(ob2)
}
function nail() {
    ob3 = createSprite(1350, Math.round(random(50, 200)))
    ob3.addImage("obstacle3", obj3)
    ob3.scale = 0.05
    ob3.velocityX = -5
    nailgroup.add(ob3)
}