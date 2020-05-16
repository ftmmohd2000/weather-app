const request = require('request')

const myurl1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const myurl2 = '.json?access_token=pk.eyJ1IjoiZnRtbW9oZCIsImEiOiJjazhpNWx6c2IwMjZpM2xvNWI0cTlqOXhpIn0.NMO_1wgoAL3lgrGG5KHk7g'

const geocode = (input, callback) => {
    
    const url = myurl1 + input + myurl2

    request({
        url: url,
        json: true
    },
        (error, { body }) => {
            if (error) {
                callback("No access to server", undefined)
            }
            else if (body.features.length === 0) {
                callback("Invalid Location", undefined)
            }
            else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
}


module.exports = geocode