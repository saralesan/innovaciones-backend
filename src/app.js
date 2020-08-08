const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMessage = require('../config/configMessage');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post('/contact_us', (req, res) => {
    console.log(JSON.stringify(req.body));
    configMessage(req.body);
    res.status(200).send();
})

app.listen(3000, () => {
    console.log('Server running...')
});