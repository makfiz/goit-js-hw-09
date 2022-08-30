import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form")
const firstDelayInp = form[0]
const stepDelayInp = form[1]
const amountInp = form[2]
const btn = form[3]


function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay })
    } else {
      // Reject
      reject({ position, delay })
    }
  }, delay)
  })
  
    promise.then(({ position, delay }) => {
          Notify.success(` Fulfilled promise ${position} in ${delay}ms`)
        })
        .catch(({ position, delay }) => {
          Notify.failure(` Rejected promise ${position} in ${delay}ms`)
        })
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const amount = Number(amountInp.value)
  const firstDelay = Number(firstDelayInp.value)
  const stepDelay = Number(stepDelayInp.value)
  promiseCreator(amount, firstDelay, stepDelay)
})
 
function promiseCreator(amount, firstDelay, stepDelay) {
  for (let i = 0; i < amount; i++) {
    let position = i + 1
    let delay = firstDelay + i * stepDelay
    createPromise(position, delay)
  }
}