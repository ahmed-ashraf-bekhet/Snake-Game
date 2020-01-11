var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");
var Replay = document.querySelector('#replay')
var but1 = document.querySelector("#lev1")
var but2 = document.querySelector("#lev2")
var but3 = document.querySelector("#lev3")
var div = document.querySelector("#level")
var title = document.querySelector("#snakeGame")
var replayBut = document.querySelector("#replay")
var canvas = document.querySelector("canvas")
var replayDiv = document.querySelector("#replayContainer")
but1.addEventListener('click', reDraw_easy)
but2.addEventListener('click', reDraw_medium)
but3.addEventListener('click', reDraw_hard)
// create the unit
var box = 32;
var speed = 100;
// load images

var ground = new Image();
ground.src = "img/ground.png";

foodImages=[]
var foodImg = new Image();
function setFoodImage(){
    foodImages[0]="img/apple.png"
    foodImages[1]="img/batee5.png"
    foodImages[2]="img/fruit.png"
    console.log(foodImages[Math.floor(Math.random() * foodImages.length)] )
    foodImg.src = foodImages[Math.floor(Math.random() * foodImages.length)]
}
setFoodImage()
// foodImg.src = "img/food.png";

level = ""

var blockImg = new Image();
blockImg.src = "img/Block.png";

// load audio files

var dead = new Audio();
var eat = new Audio();
var up = new Audio();
var right = new Audio();
var left = new Audio();
var down = new Audio();
var flag = false
var flagReply = false
var conflictFlag = false
var conflictFlag_snake = false
var food={}

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

var snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the blocks

var blocks = [{},{},{}];
function set_blocks_positions(){
    blocks[0].x = Math.floor(Math.random() * 17 + 1) * box
    blocks[0].y = Math.floor(Math.random() * 15 + 3) * box

    blocks[1].x = Math.floor(Math.random() * 17 + 1) * box
    blocks[1].y = Math.floor(Math.random() * 15 + 3) * box

    blocks[2].x = Math.floor(Math.random() * 17 + 1) * box
    blocks[2].y = Math.floor(Math.random() * 15 + 3) * box 
    while(blocks[0].x==9 * box&&blocks[1].y==10 * box && blocks[1].x==9 * box&&blocks[1].y==10 * box && blocks[2].x==9 * box&&blocks[2].y==10 * box){
        blocks[0].x = Math.floor(Math.random() * 17 + 1) * box
        blocks[0].y = Math.floor(Math.random() * 15 + 3) * box

        blocks[1].x = Math.floor(Math.random() * 17 + 1) * box
        blocks[1].y = Math.floor(Math.random() * 15 + 3) * box

        blocks[2].x = Math.floor(Math.random() * 17 + 1) * box
        blocks[2].y = Math.floor(Math.random() * 15 + 3) * box 
    }
}

// create food
function createFood_easy(){
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
    for (var i = 0; i < snake.length; i++) {
        if ((food.x == snake[i].x && food.y == snake[i].y) ||
            (food.x == snake[0].x + box && food.y == snake[0].y) ||
            (food.x == snake[0].x && food.y == snake[0].y + box) ||
            (food.x == snake[0].x - box && food.y == snake[0].y) ||
            (food.x == snake[0].x && food.y == snake[0].y - box)) {
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            } 
        }
    }
}
function createFood(){
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
    for(var i=0 ;i<snake.length ;i++){
        if(food.x==snake[i].x&&food.y==snake[i].y){
            conflictFlag_snake = true
        }
    }
    for (i = 0; i < blocks.length; i++) {
        if (food.x == blocks[i].x && food.y == blocks[i].y) {
            conflictFlag = true
        }
    }
    while (conflictFlag == true || conflictFlag_snake == true ||
            (food.x == snake[0].x + box && food.y == snake[0].y)||
            (food.x == snake[0].x && food.y == snake[0].y + box)||
            (food.x == snake[0].x - box && food.y == snake[0].y)||
            (food.x == snake[0].x && food.y == snake[0].y - box)) {
        conflictFlag = false
        conflictFlag_snake = false
        food.x = Math.floor(Math.random() * 17 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 3) * box
        for (i = 0; i < blocks.length; i++) {
            if (food.x == blocks[i].x && food.y == blocks[i].y) {
                conflictFlag = true
            }
        }
        for (i = 0; i < blocks.length; i++) {
            if (food.x == blocks[i].x && food.y == blocks[i].y) {
                conflictFlag_snake = true
            }
        }
    }
}
// create the score var

var score = 0;

//control the snake

var d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (!flagReply) {
        if (flag == false) {
            var key = event.keyCode;
            if (key == 37 && d != "RIGHT") {
                left.play();
                d = "LEFT";
            } else if (key == 38 && d != "DOWN") {
                d = "UP";
                up.play();
            } else if (key == 39 && d != "LEFT") {
                d = "RIGHT";
                right.play();
            } else if (key == 40 && d != "UP") {
                d = "DOWN";
                down.play();
            }
            flag = true
        }
    } else {
        flagReply = false;
        game = setInterval(draw, speed);
        key = event.keyCode;
        if (key == 37 && d != "RIGHT") {
            left.play();
            d = "LEFT";
        } else if (key == 38 && d != "DOWN") {
            d = "UP";
            up.play();
        } else if (key == 39 && d != "LEFT") {
            d = "RIGHT";
            right.play();
        } else if (key == 40 && d != "UP") {
            d = "DOWN";
            down.play();
        }
    }

}

// cheack collision function
function collision(head, array) {
    if (level == "hard") {
        if (head.x < box || head.x > 17 * box || head.y < 3 * box || head.y > 17 * box) {
            return true
        }
    }
    if (level == "medium" || level == "hard") {
        for (i = 0; i < blocks.length; i++) {
            if (head.x == blocks[i].x && head.y == blocks[i].y) {
                return true;
            }
        }
    }
    for (i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// 
var IncreaseSpeed = function () {
    game = setInterval(draw, speed);
}

// draw blocks 
function setBlocks_med() {
    for (i = 0; i < blocks.length; i++) {
        ctx.drawImage(blockImg, blocks[i].x, blocks[i].y)
    }
}

// draw everything to the canvas

function draw() {
    console.log(level)
    ctx.drawImage(ground, 0,0);
    if (level != "easy") {
        setBlocks_med()
    }
    for (var i = 0; i < snake.length; i++) {
        if(i==0){
            ctx.beginPath();
            ctx.fillStyle = 'green'; 
            ctx.arc(snake[i].x+16,snake[i].y+16,(box)/2, 0, Math.PI * 2, false);
            ctx.moveTo(snake[i].x+11.5,snake[i].y+12);
            ctx.arc(snake[i].x+11,snake[i].y+12, 5, 0, Math.PI * 2, true);  // Left eye
            ctx.moveTo(snake[i].x+24.5,snake[i].y+12);
            ctx.arc(snake[i].x+24,snake[i].y+12, 5, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.strokeStyle="red";
            ctx.stroke();
            ctx.closePath();
            
        }
        else if(i>0 && i<snake.length-3){
            ctx.beginPath();
            ctx.fillStyle = 'green'; 
            ctx.arc(snake[i].x+16,snake[i].y+16,(box-3)/2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.strokeStyle="red";
            ctx.stroke();
            ctx.closePath();
        }
        else if(i>snake.length-3 && i<snake.length-1){
            ctx.beginPath();
            ctx.fillStyle = 'green'; 
            ctx.arc(snake[i].x+16,snake[i].y+16,(box-5)/2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.strokeStyle="red";
            ctx.stroke();
            ctx.closePath();
        }
        else{
            ctx.beginPath();
            ctx.fillStyle = 'green'; 
            ctx.arc(snake[i].x+16,snake[i].y+16,(box-8)/2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.strokeStyle="red";
            ctx.stroke();
            ctx.closePath();
        }
        
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // which direction
    if (d == "LEFT" && snakeX < box * 2 && level !="hard") {
        snakeX = box * 17;
    } else {
        if (d == "LEFT") snakeX -= box;
    }
    if (d == "UP" && snakeY < 4 * box && level !="hard") {
        snakeY = box * 17
    } else {
        if (d == "UP") snakeY -= box;
    }
    if (d == "RIGHT" && snakeX > 16 * box && level !="hard") {
        snakeX = box * 1;
    } else {
        if (d == "RIGHT") snakeX += box;
    }
    if (d == "DOWN" && snakeY > 16 * box && level !="hard") {
        snakeY = 3 * box
    } else {
        if (d == "DOWN") snakeY += box;
    }


    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        setFoodImage()
        if (score % 3 == 0) {
            speed -= 5;
            clearInterval(game)
            IncreaseSpeed();
        }
        if (level == "easy") {
            createFood_easy()
        }
        else{
            createFood()
        }
        
        // I don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    var newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over 
    if (collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        setTimeout(function () {
            ctx.drawImage(ground, 0, 0);
            ctx.font = "100px Comic Sans MS";
            ctx.fillStyle = "mediumvioletred";
            // ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width / 11.4, canvas.height / 1.7);
            // canvas.setAttribute('style', 'display:none')
            div.setAttribute('style', 'display:block')
            // replayDiv.setAttribute('style', 'display:block')
        }, 2000)
    }
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box,1.6*box);
    flag = false
}

// call draw function every 100 ms in start

var game = setInterval(draw, speed);


function reDraw_easy() {
    up.play()
    level = "easy"
    canvas.setAttribute('style', 'display:block')
    title.setAttribute('style', 'display:none')
    div.setAttribute('style', 'display:none')
    replayDiv.setAttribute('style', 'display:none')
    clearInterval(game)
    speed = 100;
    snake = []
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };
    createFood_easy()
    score = 0;
    d = "";
    ctx.drawImage(ground, 0, 0);
    ctx.beginPath();
    ctx.fillStyle = 'green'; 
    ctx.arc(snake[0].x+16,snake[0].y+16,(box)/2, 0, Math.PI * 2, false);
    ctx.moveTo(snake[0].x+11.5,snake[0].y+12);
    ctx.arc(snake[0].x+11,snake[0].y+12, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(snake[0].x+24.5,snake[0].y+12);
    ctx.arc(snake[0].x+24,snake[0].y+12, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.fill();
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.closePath();
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box,1.6*box);
    flagReply = true;
}

function reDraw_medium() {
    set_blocks_positions()
    down.play()
    level = "medium"
    canvas.setAttribute('style', 'display:block')
    title.setAttribute('style', 'display:none')
    div.setAttribute('style', 'display:none')
    replayDiv.setAttribute('style', 'display:none')
    clearInterval(game)
    speed = 100;
    snake = []
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };
    createFood()
    score = 0;
    d = "";
    ctx.drawImage(ground, 0, 0);
    ctx.beginPath();
    ctx.fillStyle = 'green'; 
    ctx.arc(snake[0].x+16,snake[0].y+16,(box)/2, 0, Math.PI * 2, false);
    ctx.moveTo(snake[0].x+11.5,snake[0].y+12);
    ctx.arc(snake[0].x+11,snake[0].y+12, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(snake[0].x+24,snake[0].y+12);
    ctx.arc(snake[0].x+24.5,snake[0].y+12, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.fill();
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.closePath();
    setBlocks_med()
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box,1.6*box);
    flagReply = true;
}

function reDraw_hard() {
    set_blocks_positions()
    left.play()
    level = "hard"
    canvas.setAttribute('style', 'display:block')
    title.setAttribute('style', 'display:none')
    div.setAttribute('style', 'display:none')
    replayDiv.setAttribute('style', 'display:none')
    clearInterval(game)
    speed = 100;
    snake = []
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };
    createFood()
    score = 0;
    d = "";
    ctx.drawImage(ground, 0, 0);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillStyle = 'green'; 
    ctx.arc(snake[0].x+16,snake[0].y+16,(box)/2, 0, Math.PI * 2, false);
    ctx.moveTo(snake[0].x+11.5,snake[0].y+12);
    ctx.arc(snake[0].x+11,snake[0].y+12, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(snake[0].x+24.5,snake[0].y+12);
    ctx.arc(snake[0].x+24,snake[0].y+12, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.fill();
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.closePath();
    setBlocks_med()
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box,1.6*box);
    flagReply = true;
}