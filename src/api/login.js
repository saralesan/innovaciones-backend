const express = require('express');
const jwt = require('jsonwebtoken');
var config = require('../../config/config.json');
const {
    Validator
} = require('express-json-validator-middleware');
const loginSchema = require('../schemas/loginSchema.js')

var validator = new Validator({
    allErrors: true
});
var validate = validator.validate;

const router = express.Router();

router.post('/', validate({
    body: loginSchema
}), (req, res) => {
    console.log(JSON.stringify(req.body));
    var user = req.body;

    if (user.username == config.jwt.username && user.password == config.jwt.password) {
        jwt.sign({ user }, config.jwt.secret, (err, token) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                res.json({ token })
            }
        });
    } else {
        console.log("Invalid credentials");
        res.status(403).json({
            message: "Invalid credentials"
        });
    }
})

module.exports = router;