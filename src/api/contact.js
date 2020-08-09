const express = require('express');
const configMessage = require('../../config/configMessage');
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
}), (req, res) => {
    console.log(JSON.stringify(req.body));
    configMessage(req.body);
    res.status(200).send();
})

module.exports = router;