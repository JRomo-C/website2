btn-open = getElementById('rules-btn')
btn-close = getElementById('close-btn')
rules = getElementById('rules')

btn-open.addEventListener('click',() => {
    rules.classList.add('show')
})