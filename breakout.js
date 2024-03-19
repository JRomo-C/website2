open = document.getElementById('rules-btn')
close = document.getElementById('close-btn')
rules = document.getElementById('rules')

// Rules open and close event handlers
open.addEventListener('click',() => {
    rules.classList.add('show')
})

close.addEventListener('click', () => {
    rules.classList.remove('show')
})