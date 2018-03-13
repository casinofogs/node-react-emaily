const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    }
}, { collection: 'users' });

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;