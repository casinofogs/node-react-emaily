const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./../config/keys');

// Access token: if we want to do CRUD operation in user's email inbox in google, or just want to set some previleges on user account in google, then this access token needed to set them. Mind that, access token automatically expires after some amount of time.

// Refresh token: Access token automatically expires after some amount of time. So here comes the refresh token. It allows us to refresh the Access token automatically after some amount of time.

const UserModel = mongoose.model('users');

// Hey passport, You know how to authenticate in general. But you don't really know how to authenticate using google. So use GoogleStrategy() to authenticate user, using google.
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async function (accessToken, refreshToken, profile, done) {
    // This callback function is called, when all of the passport authentication staffs done. We can save the user in db rom here.

    // console.log(accessToken);
    // console.log(profile);

    // Check the user already exists or not
    const existingUser = await UserModel.findOne({ googleId: profile.id });
    
    if (existingUser) {
        // We already have an record with existing googleId
        // After successful operation, we have to call done(). done() accepts two arguments. done(errorObject, successDataObject). done() will explicitly tell passport that, we just finished our authentication flow. Though passport is nothing but an middleware,so it will grab the value from done-successObject or errObject and pass it to next middleware.

        //Though we are not passing erroObj, so the first argument is given as null.
        done(null, existingUser);
    } else {
        // We will save the user's googleId to database
        const newUser = await new UserModel({
            googleId: profile.id
        }).save();

        done(null, user);
    }

}));

//

// Here 'user' argument is what returned from the done callback of "passport.use(new GoogleStrategy({..}))". In other words "done(null, existingUser)" or "done(null, user)" returned 'user' is passed to "passport.serializeUser(function (user, done) {})".
passport.serializeUser(function (user, done) {
    // Here user.id is not googleId. It's mongoDB objectId(_id: {$oid: 'lsd6587as..'}) returned from DB for that particular user. We are using that, because different user will login via different services like -facebook, linkedin. SO it's a good practise to authenticate them using a common id from mongo.
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id)
        .then(function (user) {
            done(null, user);
        });
});
// We donot have to do any of module.exports here. We just have to execute this file.



// More cleaner googleStrategy callback function
// async function (accessToken, refreshToken, profile, done) {
//     const existingUser = await UserModel.findOne({ googleId: profile.id });
    
//     if (existingUser) {
//         return done(null, existingUser);
//     }
    
//     const newUser = await new UserModel({ googleId: profile.id }).save();
//     done(null, user);
// }