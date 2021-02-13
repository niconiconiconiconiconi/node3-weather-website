const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { isAbsolute } = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define PATHs for express Config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Peter Diomaro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Peter Diomaro'
        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Help example',
        title: 'Help!',
        name: 'Peter Diomaro'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No address provided!'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location,
                weather: forecastData
            })
        })
    })
})

//404 pages
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        message: "Help article not found",
        name: 'Peter Diomaro'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Peter Diomaro'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})