const request = require('request')


const geocode = (address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmljZGlvbWFybyIsImEiOiJja2t4bHIzNGEwMmx5MndybWlxMWtpanFzIn0.vyoeerj_tjWW8MRKcMcfSw&limit=1'
    
    request ({url: geourl, json: true}, (error, {body} = {}) =>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location!', undefined)
        } else {
            callback (undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            } )
        }
    })
}
module.exports = geocode