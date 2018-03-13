module.exports = function (req, res, next) {
    // Authentication
    if (!req.user) {
        // 401 means, Unauthorized access or forbidden
        return res.status(401).send({ error: 'You must log in!' });
    }

    next();
};