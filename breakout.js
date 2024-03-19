btnopen = getElementById('rules-btn')
btnclose = getElementById('close-btn')
rules = getElementById('rules')

btnopen.addEventListener('click',() => {
    rules.classList.add('show')
})