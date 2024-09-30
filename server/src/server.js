require('dotenv').config();
const cookieParser = require('cookie-parser')
const express = require('express');
const routes = require('./routes/routes');
const morgan = require('morgan');

const app = express();

const cors = require('cors');
const { schedule } = require('node-cron');
const membershipService = require('./services/membership.service');

app.use(express.json());
app.use(cors({
    origin: [`${process.env.ORIGIN_PUBLIC}`, `${process.env.ORIGIN_LOCAL}`],
    optionsSuccessStatus: 200
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));

schedule('0 0 * * *', async () => {
    console.log('Daily reset cron job started at:', new Date().toLocaleString());
    try {
        const result = await membershipService.resetDailyLimit();
        console.log('Daily limit reset completed at:', new Date().toLocaleString());
        console.log('Reset result:', result);
    } catch (error) {
        console.error('Error resetting daily limit:', error);
    }
});

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

module.exports = app;