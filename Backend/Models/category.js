const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        default: "-no description-"
    }
})

const Category = mongoose.model('category', categorySchema);
module.exports = Category;
