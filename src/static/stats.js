function getStats() {
    const stringArray = document.querySelectorAll('letter')
    // wpm calculation
    const totalTime = (new Date().getTime() - startTime) / 1000
    const words = randomQuote.split(' ').length
    const wpm = Math.round(words / (totalTime / 60))
    // accuracy calculation
    const letters = stringArray.length
    const correctLetters = document.querySelectorAll('.correct').length
    const accuracy = Math.round((correctLetters / letters) * 100)

    return {
        wpm,
        accuracy
    }
}
// when restart button is pressed, reload page to load new text
const restartButton = document.getElementById('reset-test')
restartButton.addEventListener('click', () => {
    window.location.reload()
})

// dont allow inspecting or copying of text
document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}