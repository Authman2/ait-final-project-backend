// Load Mongoose.
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Playlist = mongoose.model('Playlist');
const Song = mongoose.model('Song');

module.exports = {

    async findExistingUser(email, password = undefined) {
        try {
            if(password) return await User.findOne({ email, password });
            else return await User.findOne({ email: email });
        } catch(err) { return undefined; }
    },

}