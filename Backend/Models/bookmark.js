const mongoose = require('mongoose');
const bookmarkSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    api: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'api',
        required: true
    }

})

const Bookmark = mongoose.model('bookmark', bookmarkSchema);
module.exports = Bookmark;
