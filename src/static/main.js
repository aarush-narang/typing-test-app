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
        capswarn.style.display = 'flex'
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
let totalTranslateY = 0
let totalTranslateX = 0
wordsInput.addEventListener('input', (event) => {
    const wordsContainer = document.getElementById('words')
    const caret = document.getElementById('caret')
    const stringArray = document.querySelectorAll('letter')
    const inputArray = document.querySelector('#wordsInput').value.split('')
    stringArray.forEach((char, index) => {
        const character = inputArray[index]

        if (!character) { // if the person is not at the character yet, it will be undefined. do not correct
            char.classList.remove('correct')
            char.classList.remove('incorrect')
        } else if (character === stringArray[index].textContent) {
            char.classList.add('correct')

        } else {
            char.classList.add('incorrect')
        }
        // move the caret back/forth depending on what letter they are on
        if (inputArray.length === 0) {
            // if they deleted all words in the input
            caret.style.transform = `translate(0px, 0px)`
            totalTranslateX = 0
            totalTranslateY = 0
        } else if (character && !inputArray[index + 1]) {
            if (event.inputType === 'deleteContentBackward') {
                // if it is the first character in the line
                if (totalTranslateX <= '0' && (!inputArray[index + 1])) { // find better logic to tell if it is at the end of the line
                    totalTranslateY -= 30
                    totalTranslateX = wordsContainer.clientWidth
                    caret.style.transform = `translate(0px, ${totalTranslateY}px)`
                }
                totalTranslateX -= 13.85
                caret.style.transform = `translate(${totalTranslateX}px, ${totalTranslateY}px)`
            } else {
                // if it is the last character in the line
                if (totalTranslateX > wordsContainer.clientWidth - 30 && (!inputArray[index + 1] && inputArray[index] === ' ')) { // find better logic to tell if it is at the end of the line
                    totalTranslateY += 30
                    totalTranslateX = 0
                    caret.style.transform = `translate(0px, ${totalTranslateY}px)`
                } else {
                    totalTranslateX += 13.85
                    caret.style.transform = `translate(${totalTranslateX}px, ${totalTranslateY}px)`
                }
            }
            console.log(totalTranslateX, totalTranslateY)

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