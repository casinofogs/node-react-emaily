const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const bodyParser = require('body-parser');
const keys = require('./config/keys');

const UserModel = require('./models/User');

// We are not explicitly requiring anything from passport. We are just executing the file.
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

// Using this bodyparser or express, the POST request payload from user can be found in req.body
// express.json is available from express-4.16.0
// we are using express.json() instead of body-parser
app.use(express.json());

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
billingRoutes(app);


// For heroku production
if (process.env.NODE_ENV === 'production') {
    // Express will server up production assets like - main.js or main.css
    app.use(express.static('client/build'));

    // Express will serve up the index.html file, if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const PORT = process.env.PORT || 5000;

app.listen(PORT);