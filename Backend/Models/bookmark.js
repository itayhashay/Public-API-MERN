const mongoose = require('mongoose');
const bookmarkSchema = new mongoose.Schema({

    userId: {
        type: String,
        require: true
    },
    apiId: {
        type: String,
        require: true
    }

})

const Bookmark = mongoose.model('bookmark', bookmarkSchema);
module.exports = Bookmark;
