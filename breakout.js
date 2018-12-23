var canvas = document.getElementById("breakoutCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);

/************ Global Variables **************/
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var x = canvas.width/2;
var y = canvas.height-30;

var dx = -1.5;
var dy = -1.9;

var ballRadius = 10;

var gameOver = false;

/************ Game Element Drawing **************/
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#9595DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    if (gameOver)
    {
        alert("GAME OVER");
        gameOver = false;
        document.location.reload();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updatePaddlePosition();
    updateBallPosition();

    drawBall(x, y);
    drawPaddle();
}

function updatePaddlePosition()
{
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function updateBallPosition()
{
    if (x + dx + ballRadius > canvas.width
        || x + dx - ballRadius < 0)
    {
        dx = -dx;
    }
    if (y + dy < ballRadius)
    {
        // Ball hit top of canvas
        dy = -dy;
    } 
    else if (y + dy + ballRadius > canvas.height - paddleHeight)
    {
        if (x + ballRadius * 0.5 < paddleX 
            || x - ballRadius * 0.5 > paddleX + paddleWidth)
        {
            // Ball outside of paddle's reach
            // Just set the flag here so that we will draw the bal
            // for one more frame and it will look like it hit the
            // bottom of the screen instead of stopping at the 
            // top of the paddle's height.
            gameOver = true;
        }
        else
        {
            // Ball hit paddle
            dy *= -1.01;
        }
    }

    x += dx;
    y += dy;
}

/************ Input Handling ************/
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}