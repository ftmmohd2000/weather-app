const request = require('request')

const forecast = ({latitude,longitude},callback)=>{
    const myurl = 'http://api.weatherstack.com/current?access_key=8df599ae7c4a4c9ecf651a35842c8487&query='
    + latitude + ',' + longitude
    request({
        url: myurl,
        json: true
    },
    (error,{body})=>{
        if(error)
            callback("Shit's fucked up yo",undefined)
        else if(body.error)
            callback("LOL",undefined)
        else
            callback(undefined,body.current)
    })
}

module.exports = forecast