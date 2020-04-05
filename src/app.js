const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/wforecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewDir = path.join(__dirname,'../templates/views')
const partialDir = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(partialDir)

app.use(express.static(publicDir))

app.get('',(req,response)=>{
    response.render('index',{
        title: 'Home Page',
        name: 'Mohammed Motorwala'
    })
})

app.get('/about',(req,response)=>{
    response.render('about',{
        title: 'About',
        name: 'Mohammmed Motorwala'
    })
})

app.get('/help', (req, response) => {
    response.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Mohammed Motorwala'
    })
})


app.get('/weather',(req,response)=>{

    if(!req.query.address){
        return response.send({
            address: req.query.address
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error)
            response.send({ error: 'Invalid location.' })
        else{
            forecast(data,(error,weather)=>{
                if(error)
                    response.send({ error: 'No connection' })
                else{
                    response.send(weather)
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohammed Motorwala',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('error', {
        title: '404',
        name: 'Mohammed Motorwala',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Started Server at port ' + port)
})