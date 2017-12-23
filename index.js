const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const UserModel = require('./models/User');

// We are not explicitly requiring anything from passport. We are just executing the file.
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

// Telling express to sey cookie using cookie-session npm lib.
app.use(cookieSession({
    name: 'baal',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey, 'something'] // Encrypting the cookie
    // keys: ['wow']
}));

// "passport.initialize()" and "passport.session()" should be called after "app.use(cookieSession(...". They are telling passport to use cookies for authentication.
app.use(passport.initialize());
app.use(passport.session());



// app.get('/', function (req, res) {
//     res.send({ hi: 'there', bye: 'buddy' });
// });
authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);