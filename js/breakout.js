open = document.getElementById('rules-btn')
close = document.getElementById('close-btn')
rules = document.getElementById('rules')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
play = document.getElementById('play')

score = 0

brickRowCount = 9
brickColumnCount = 5

// Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// Create paddle properties
paddle = {
    x: canvas.width /2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,

}

//Create Brick Properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create Bricks
bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }

}

// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.closePath()
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.closePath()
}

//Draw score on canvas
function drawScore() {
    ctx.font ='20px Arial'
    ctx.fillText(`Score: ${score}`,canvas.width-100, 30)
    ctx.closePath()
}

//Draw Bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? 'black' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

//Draw Everything
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPaddle()
    drawBall()
    drawBricks()
    drawScore()
}
document.addEventListener('DOMContentLoaded', (event) => {
    play.addEventListener('click', () => {
        play.classList.add('hidden');
        update();
    })
});


// Move paddle on canvas
function movePaddle() {
    paddle.x = paddle.x + paddle.dx

    //Wall Detection
    if (paddle.x < 0) {
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

//Keydown event
function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd') {
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = -paddle.speed
    }

}

//KeyUp Event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = 0
    }

}

//Keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    // Wall collision (top)
    if (ball.y + ball.size < 0) {
        ball.dy = -1 * ball.dy
    }

    // Wall collision (right)
    if (ball.x + ball.size > canvas.width) {
        ball.dx = -1 * ball.dx
    }

    // Wall collision (bottom)
    if (ball.y + ball.size > canvas.height) {
        ball.dy = -1 * ball.dy
        showAllBricks()
        score = 0
    }

    // Wall collision (left)
    if (ball.x + ball.size < 0) {
        ball.dx = -1 * ball.dx
    }

    // Paddle Collision
    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    )
    {
        ball.dy = -1 * ball.dy
    }

    // Brick Collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if (
                    ball.x - ball.size > brick.x && //left brick side
                    ball.x + ball.size < brick.x + brick.w && //Right brick side
                    ball.y + ball.size > brick.y && // Top
                    ball.y - ball.size < brick.y + brick.h //bottom
                )
                {
                ball.dy = -1 * ball.dy
                brick.visible = false
                increaseScore()
                drawScore()
                }

            }
        })
    })

}

//Increase Score
function increaseScore() {
    score++
    if (score == brickRowCount * brickColumnCount) {
        score = 0
        showAllBricks()
    }

}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}


// Update Canvas drawing and animation
function update() {
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
}








// Rules open and close event handlers
open.addEventListener('click',() => {
    rules.classList.add('show')
})

close.addEventListener('click', () => {
    rules.classList.remove('show')
})