const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

// Authorization: Bearer <token>
function validateToken(req, res, next) {
    console.log("Validate token");
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];

        jwt.verify(bearerToken, config.jwt.secret, (error, authData) => {
            if (error) {
                console.log("Unsuccessful authorization, error: " + error);

                res.sendStatus(403);
            } else {
                console.log("Successful authorization with auth data: " + JSON.stringify(authData));
                req.auth = authData;

                next();
            }
        });

    } else {
        console.log("Request without authorization bearer");
        res.sendStatus(403);
    }
}

module.exports = validateToken;