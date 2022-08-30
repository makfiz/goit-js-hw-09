import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selector = document.querySelector("input#datetime-picker")
const btn  = document.querySelector("[data-start]")
const dispDays = document.querySelector("[data-days]")
const dispHours = document.querySelector("[data-hours]")
const dispMinutes = document.querySelector("[data-minutes]")
const dispSeconds = document.querySelector("[data-seconds]")

btn.disabled = true
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        let selectedDate = Date.parse(selectedDates[0])
        let currenDate = new Date()
        if (Math.sign(selectedDate - currenDate) === -1) {
            btn.disabled = true
            Notify.failure("Please choose a date in the future")  
        } else {
            btn.disabled = false
            Notify.success(`Timer set to:${selectedDates}`)
            let timerId = setInterval(() => {
                currenDate = new Date()
                let diffTime = selectedDate - currenDate;
                if (diffTime <= 0) {
                    diffTime = 0;
                    clearInterval(timerId)
                }
                let timer = convertMs(diffTime)
                let {days, hours, minutes, seconds} = timer
                dispDays.innerHTML = days.length > 1 ? days : addLeadingZero(days)
                dispHours.innerHTML = hours.length > 1 ? hours : addLeadingZero(hours)
                dispMinutes.innerHTML = minutes.length > 1 ? minutes : addLeadingZero(minutes)
                dispSeconds.innerHTML = seconds.length > 1 ? seconds : addLeadingZero(seconds)
            }, 1000)
        }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
  
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0")
}



flatpickr(selector, options)