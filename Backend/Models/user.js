const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        trim: true
    },
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        require: true,
        enum: ['Male', 'Female']
    },
    birthday: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        default: 'CLIENT',
        enum: ['CLIENT', 'ADMIN']
    }

})

const User = mongoose.model('user', userSchema);
module.exports = User;