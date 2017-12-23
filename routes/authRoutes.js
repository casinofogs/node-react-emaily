const passport = require('passport');

module.exports = function (app) {
    // First Authenticate Request pushed to /auth/google. It will use the authentication rules written above "passport.use(new GoogleStrategy(..". After getting this request, google server ask user(who want to login) to give permission. When user permits, google generate 'localhost:5000/auth/google/callback?code=4mafG45'. In that moment, the user stayed put or on hold by google and only the code(4mafG45) send to our App server from the url(localhost:5000/auth/google/callback?code=4mafG45). And then google server expects a get request from App server.
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // Google generates the code like- localhost:5000/auth/google/callback?code=4mafG45... Now we have to send GET request back with '/auth/google/callback' to google server, to verify the code. Note that, we donot have to sent that code explicitly to google server like - localhost:5000/auth/google/callback?code=4mafG45. It is managed automatically by passport. Passport automatically send the code along with this url '/auth/google/callback'. This is all done by the route handler 'passport.authenticate('google')' passed in app.get('...', passport.authenticate('google')).

    // For more - see video 3.25 - Oauth callback
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', function (req, res) {
        req.logout(); // this logout is passport's method attacher while authentication
        res.send({ logoutMessage: 'You have successfully logged out' });
    });

    // testing user request which comes after Oauth part
    app.get('/api/currentUser', function (req, res) {
        res.send(req.user); // req.user, where 'user' is added by passport
        // res.send(req.session); // Actual user object is in "req.session"
    });
};

// https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=706272289661-3c81as2l8dgu210q3d4gml171hm5cn4m.apps.googleusercontent.com&as=-73507ff93dac0b52&destination=http%3A%2F%2Flocalhost%3A5000&approval_state=!ChQ1aTdaTEdJbmR4cXVVRWprTWhrYhIfUTJIVVp0OVJaZHdmVU9xWmlfQjdtUjlFbTNBTUJCWQ%E2%88%99ACThZt4AAAAAWi6Symi-A3kgEKBYQBbL3bPbCltcfpQ5&xsrfsig=AHgIfE_Z3bNtdJNFNFIr4u7ZPELI0mWdDA&flowName=GeneralOAuthFlow