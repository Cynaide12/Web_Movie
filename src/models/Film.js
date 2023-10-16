const {Schema, model} = require("mongoose")
const Film = new Schema({
    title: {type: String, unique: false, required: true},
    description: {type: String, unique: false, required: true},
    date: {type: String, unique: false, required: true},
    category: {type: Array, required: true},
    country: {type: String, required: true},
    filmSrc: {type: String, required: false},
    thumbnail: {type: String, required: true},
    isSlider: {type: Boolean, required: true},
    sliderThumbnail: {type: String, required: false},
    actors: {type: String, required: false},
    trailer: {type: String, required: false},
    addedDate: { type: Date, default: Date.now }
}, {
    versionKey: false
})
module.exports = model("Film", Film)