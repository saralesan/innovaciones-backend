const express = require('express');
const contact = require('./contact');
const login = require('./login');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Innovaciones API'
    });
});

router.use('/contact', contact);
router.use('/login', login);

module.exports = router;