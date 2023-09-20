const mongoose = require("mongoose")

const catSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Cat", catSchema)