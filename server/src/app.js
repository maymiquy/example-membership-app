require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());

app.use('/auth', routes);
app.use('/', (req, res) => {
    res.send('<div><h1>Welcome to Astronacci</h1></div>');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});