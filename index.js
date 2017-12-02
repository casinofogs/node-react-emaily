const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const express = require('express');
const app = express();

// app.get('/', function (req, res) {
//     res.send({ hi: 'there', bye: 'buddy' });
// });


// Hey passport, You know how to authenticate in general. But you don't really know how to authenticate using google. So use GoogleStrategy() to authenticate user, using google.
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
    // This callback function is called, when all of the passport authentication staffs done. We can save the user in db rom here.

    console.log(accessToken);
    console.log(profile);
}));

// Access token: if we want to CRUD users email inbox in google, or just want to set some previleges on user account in google, then this access token needed to set them. Mind that, access token automatically expires after some amount of time.

// Refresh token: Access token automatically expires after some amount of time. So here comes the refresh token. It allows us to refresh the Access token automatically after some amount of time.

// First Authenticate Request pushed to /auth/google. It will use the authentication rules written above "passport.use(new GoogleStrategy(..". After getting this request, google server ask user(who want to login) to give permission. When user permits, google generate 'localhost:5000/auth/google/callback?code=4mafG45'. In that moment, the user stayed put or on hold by google and only the code(4mafG45) send to our App server from the url(localhost:5000/auth/google/callback?code=4mafG45). And then google server expects a get request from App server.
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google generates the code like- localhost:5000/auth/google/callback?code=4mafG45... Now we have to send GET request back with '/auth/google/callback' to google server, to verify the code. Note that, we donot have to sent that code explicitly to google server like - localhost:5000/auth/google/callback?code=4mafG45. It is managed automatically by passport. Passport automatically send the code along with this url '/auth/google/callback'. This is all done by the route handler 'passport.authenticate('google')' passed in app.get('...', passport.authenticate('google')).

// For more - see video 3.25 - Oauth callback
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);