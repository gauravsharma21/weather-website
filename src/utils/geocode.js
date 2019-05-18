const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2F1cmF2c2hhcm1hMjEiLCJhIjoiY2p1azY3aXZzMDFsYTRjbXFtNXIzb3NwMyJ9.bhDR7spBCvHtNlNsxOFLXw'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Cannot connect to network services!')
        }
        else if (body.features.length == 0) {
            callback('Unable to find location. Try another search!')
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