const validateToken = require("./validateToken.js");

const express = require('express');
const configMessage = require('../../config/configMessage');
const config = require('../../config/config.json');
const axios = require('axios');

const {
    Validator
} = require('express-json-validator-middleware');
const contactSchema = require('../schemas/contactSchema.js')

var validator = new Validator({
    allErrors: true
});
var validate = validator.validate;

const router = express.Router();

router.post('/', validate({
    body: contactSchema
}), validateToken, async (req, res) => {

    var result = await axios.post("https://www.google.com/recaptcha/api/siteverify", {}, {
        params: {
            secret: config.recaptchav3_key,
            response: req.body.recaptcha
        }
    });

    if (result.data.success == false) {
        return res.status(403).json({ msg: 'Google Recaptcha error' });
    } else {
        configMessage(req.body);
        res.status(200).json({
            message: "Contact sent"
        });
    }

})

module.exports = router;