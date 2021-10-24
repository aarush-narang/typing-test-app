// getting text and rendering
let randomQuote
function getRandomQuoteAndRender() {
    const quoteRequest = new XMLHttpRequest()
    quoteRequest.open('GET', '/generateText')
    quoteRequest.addEventListener('load', (response) => {
        randomQuote = response.target.response
        // randomQuote = 'test'
        const wordsParent = document.getElementById('words')
        randomQuote.split('').forEach(letter => {
            const newLetter = document.createElement('letter')
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
    if (document.activeElement != wordsInput) {
        wordsInput.focus()
    }
})
document.addEventListener('keydown', (event) => {
    if (document.activeElement != wordsInput) {
        wordsInput.focus()
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
    const stringArray = document.querySelectorAll('letter')
    const inputArray = document.querySelector('#wordsInput').value.split('')
    stringArray.forEach((char, index) => {
        const character = inputArray[index]
        if (!character) {
            char.classList.remove('correct')
            char.classList.remove('incorrect')
        } else if (character === randomQuote[index]) {
            char.classList.add('correct')
        } else {
            char.classList.add('incorrect')
        }
    })
    if (stringArray.length === inputArray.length) {
        clearInterval(timerInterval)
        
        const {wpm, accuracy} = getStats()

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