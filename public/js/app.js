// console.log('client side javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
//


const weatherForm = document.querySelector('form')
const searchWeather = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message1.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    const fetchUrl = '/weather?address=' + searchWeather.value
    fetch(fetchUrl).then((response)  => {
        response.json().then((weather) => {
            if(weather.error){
                message2.textContent = weather.error
                return message1.textContent = 'There is an error'
            }
            message1.textContent = 'Weather in ' + weather.address + ' (' + weather.location + ')'
            message2.textContent = weather.weather.weather + '. Feels like: ' + weather.weather.feelslike + '\nTemperature: ' + weather.weather.temp + '\nLocation: ' + weather.weather.location.name + ', ' + weather.weather.location.country + ' Observation Time: ' + weather.weather.observation_time
            console.log(weather.weather)
        })
    })
})


