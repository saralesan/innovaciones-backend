const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const middlewares = require('./middlewares');

const app = express();
const port = process.env.PORT || 5000;

const api = require('./api');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`Server running in port ${port}...`)
});

module.exports = app;