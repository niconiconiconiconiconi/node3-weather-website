const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0df7118c063d70f047126fb14fb10a3a&query='+ lat +','+ long
    
    // console.log(url)
    
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                location: {
                    name: body.location.name,
                    country: body.location.country
                },
                weather: body.current.weather_descriptions,
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                observation_time: body.current.observation_time,
            })
        }
    })
}

module.exports = forecast




//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)