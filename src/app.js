const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('views', viewspath)

app.set('view engine', 'hbs')
app.use(express.static(publicpath))
hbs.registerPartials(partialspath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Gaurav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Gaurav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gaurav',
        helptext: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address here'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search here'
        })
    }
    res.send(
        {
            products: {}
        }
    )

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gaurav',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gaurav',
        errorMessage: 'page not found'
    })
})
app.listen(port, () => {
    console.log('The server has started')
})
