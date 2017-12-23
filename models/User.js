const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: String
}, { collection: 'users' });

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;