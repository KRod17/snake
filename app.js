const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 1;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio('sound/gulp.mp3');

// IMAGEN DE LA MANZANA
const img = new Image();
img.src = 'img/apple.png';

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    
    checkAppleColision();
    drawApple();
    drawSnake();
    drawScore();
    // console.log('draw game');
    setTimeout(drawGame, 1000/speed); //Velocidad
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

// Choque con muro izquierdo
    if(headX < 0){
        gameOver = true;
    }
// Choque con muro derecho
    if(headX === tileCount){
        gameOver = true;
    }
// Choque con muro de arriba
    if(headY < 0){
        gameOver = true;
    }
// Choque con muro de abajo
    if(headY === tileCount){
        gameOver = true;
    }

// Choque con el cuerpo de la snake
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if( part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
    
        if (gameOver) {
          ctx.fillStyle = "white";
          ctx.font = "50px Verdana";
    
          var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          gradient.addColorStop("0", " magenta");
          gradient.addColorStop("0.5", "blue");
          gradient.addColorStop("1.0", "red");
          // Llenar el texto con el gradiente.
          ctx.fillStyle = gradient;
    
          ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        }
    
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "15px Verdana";
    ctx.fillText("Score " + score, canvas.width-80, 15);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function drawSnake(){
    
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        // context.arc(x, y, r, ap, af , cR)

        ctx.fillRect(part.x * tileCount , part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle = 'blue';
    // fillRect(x, y, width, height)
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    
    // ctx.drawImage(img, headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.clearRect(headX * tileCount +  2, headY * tileCount, 6, 6);
    ctx.clearRect(headX * tileCount + 10, headY * tileCount, 6, 6);    
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.drawImage(img, appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    ctx.fillStyle = 'red'
    // ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleColision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
        speed++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //Up
    if(event.keyCode == 38){
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }

    //Down
    if(event.keyCode == 40){
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    //Left
    if(event.keyCode == 37){
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    //Rigth
    if(event.keyCode == 39){
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();

function reset(){
speed = 7;

tileCount = 20;
tileSize = canvas.width / tileCount - 2;
headX = 10;
headY = 10;
snakeParts = [];
tailLength = 1;

appleX = 5;
appleY = 5;

xVelocity = 0;
yVelocity = 0;

score = 0;
clearScreen();
drawGame();
}