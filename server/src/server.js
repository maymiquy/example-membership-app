require('dotenv').config();
const cookieParser = require('cookie-parser')
const express = require('express');
const routes = require('./routes/routes');
const morgan = require('morgan');

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', routes);
app.use('/', (req, res) => {
    res.status(200).json({
        message: "Wellcome to API",
        status: 200
    });
});

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});