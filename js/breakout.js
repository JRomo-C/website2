open = document.getElementById('rules-btn')
close = document.getElementById('close-btn')
rules = document.getElementById('rules')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

// Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4;
    dy: -4;
}

// Draw ball on canvas
function drawBall() {
    
}




// Rules open and close event handlers
open.addEventListener('click',() => {
    rules.classList.add('show')
})

close.addEventListener('click', () => {
    rules.classList.remove('show')
})