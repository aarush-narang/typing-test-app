// getting text and rendering
let randomQuote

function getRandomQuoteAndRender() {
    const quoteRequest = new XMLHttpRequest()
    quoteRequest.open('GET', '/generateText') // get random text from endpoint
    quoteRequest.addEventListener('load', (response) => {
    randomQuote = response.target.response
    const wordsParent = document.getElementById('words')
    randomQuote.split('').forEach(letter => {
        const newLetter = document.createElement('letter') // create a new custom element for each letter
        newLetter.innerHTML = letter
        wordsParent.appendChild(newLetter)
    })
    })
    quoteRequest.send()
}
getRandomQuoteAndRender()

// if input where text is going to be checked is not in focus when a key is pressed, focus into it
const wordsInput = document.getElementById('wordsInput')
const typingTestContainer = document.getElementById('typingTestContainer')
typingTestContainer.addEventListener('click', () => {
    if (document.activeElement != wordsInput) { // onclick, if input box that needs to be typed in is not in focus, focus it
        wordsInput.focus()
    }
})
document.addEventListener('keydown', (event) => { 
    if (document.activeElement != wordsInput) { // on keydown, if input box that needs to be typed in is not in focus, focus it
        wordsInput.focus()
    }
    const capswarn = document.getElementById('caps-warn-container') // check if they have caps lock on
    if (event.getModifierState('CapsLock')) {
        capswarn.style.display = 'block'
    } else {
        capswarn.style.display = 'none'
    }
})
// start timers
let startTime
let timerInterval
wordsInput.addEventListener('input', () => {
    const date = new Date()
    startTime = date.getTime()

    const timer = document.getElementById('timer')
    let time = timer.innerHTML

    time++
    timer.innerHTML = time
    timerInterval = setInterval(() => {
        time++
        timer.innerHTML = time
    }, 1000);

}, {
    once: true
})

// when letters are inputted, mark them as correct or incorrect
wordsInput.addEventListener('input', (event) => {
    const caret = document.getElementById('caret')
    const stringArray = document.querySelectorAll('letter')
    const inputArray = document.querySelector('#wordsInput').value.split('')
    stringArray.forEach((char, index) => {
        const character = inputArray[index]
        if (!character) { // if the person is not at the character yet, it will be undefined. do not correct
            char.classList.remove('correct')
            char.classList.remove('incorrect')

            // if they deleted all words in the input
            if (inputArray.length === 0) {
                stringArray[0].before(caret)
            }
        } else if (character === stringArray[index].textContent) {
            char.classList.add('correct')
            
            // move the caret back/forth depending on what letter they are on
            if (inputArray.length === 0) {
                stringArray[0].before(caret)
            } else {
                stringArray[index].after(caret)
            }
        } else {
            char.classList.add('incorrect')

            // move the caret back/forth depending on what letter they are on
            if (inputArray.length === 0) {
                stringArray[0].before(caret)
            } else {
                stringArray[index].after(caret)
            }
        }
    })

    if (stringArray.length === inputArray.length) {
        clearInterval(timerInterval)

        const {
            wpm,
            accuracy
        } = getStats()

        const textContainer = document.getElementById('container')
        textContainer.style.display = 'none'

        const statsContainer = document.getElementById('stats')
        statsContainer.style.display = 'flex'

        const wpmDisplay = statsContainer.querySelector('#wpm')
        wpmDisplay.innerHTML = `${wpm} wpm`

        const accuracyDisplay = statsContainer.querySelector('#accuracy')
        accuracyDisplay.innerHTML = `${accuracy}% accuracy`
    }

})