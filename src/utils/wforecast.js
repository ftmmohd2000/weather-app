const request = require('request')

const forecast = ({ latitude, longitude }, callback) => {
    const myurl = 'http://api.weatherstack.com/current?access_key=8df599ae7c4a4c9ecf651a35842c8487&query='
        + latitude + ',' + longitude
    request({
        url: myurl,
        json: true
    },
        (error, { body }) => {
            if (error || body.error)
                callback("Error", undefined)
            else
                callback(undefined, body)
        })
}

module.exports = forecast