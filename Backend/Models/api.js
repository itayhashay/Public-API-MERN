const mongoose = require('mongoose');
const apiSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0,
        required: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    img: {
        type: String,
        default: "https://www.elemental.co.za/cms/resources/uploads/blog/86/926f6aaba773.png"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    uploadBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

})

const Api = mongoose.model('api', apiSchema);
module.exports = Api;
