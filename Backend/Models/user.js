const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'CLIENT',
        enum: ['CLIENT', 'ADMIN']
    }

})

const User = mongoose.model('user', userSchema);
module.exports = User;