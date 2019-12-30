const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    city: String,
    dob: String,
    contact: Number,
    postedAt: {
        type: String,
        default: Date
    }
}, {writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000,
    timestamps: true
}},{timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;
