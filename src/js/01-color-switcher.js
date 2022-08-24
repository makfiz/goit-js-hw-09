const body = document.querySelector("body")
const btnStart = document.querySelector("[data-start]")
const btnStop = document.querySelector("[data-stop]")
let timerId
btnStop.disabled = true

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bodyRandomColor() {
    const color = getRandomHexColor()
    body.style.backgroundColor = `${color}`
    console.log(body.style.backgroundColor)
}



btnStart.addEventListener('click', () => {
    timerId = setInterval(bodyRandomColor, 1000)
    btnStart.disabled = true
    btnStop.disabled = false
})

btnStop.addEventListener('click', () => {
    clearInterval(timerId)
    btnStart.disabled = false
    btnStop.disabled = true
})