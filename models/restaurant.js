var mongoose = require('mongoose');

// how to write geojson: https://mongoosejs.com/docs/geojson.html
// I used pointSchema here
const restaurantSchema = new mongoose.Schema(
    {
        "name":String,
        location: 
        {
            type: 
            {
                type:   String,
                enum:   ['Point'],
                required:   true
            },
            coordinates: 
            {
                type:   [Number],
                required:   true
            }
        },
        "food":String,
        "time":String
    }
);

var restaurants = mongoose.model('restaurants', restaurantSchema);
