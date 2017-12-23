// commit this - keys.js
// keys.js - figure out what set of credentials to return
// if the project ran on heroku, it will automatically detect process.env.NODE_ENV=production
// if the project ran on local m/c, it will automatically detect process.env.NODE_ENV=dev

if (process.env.NODE_ENV === 'production') {
    // We are in production. Return the prod set of keys
    module.exports = require('./prodKeys');
} else {
    // We are in development. Return the dev set of keys
    module.exports = require('./devKeys');
}