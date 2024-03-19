open = getElementById('rules-btn')
close = getElementById('close-btn')
rules = getElementById('rules')

// Rules open and close event handlers
open.addEventListener('click',() => {
    rules.classList.add('show')
})

close.addEventListener('click', () => {
    rules.classList.remove('show')
})