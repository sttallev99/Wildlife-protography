const express = require('express');
const { PORT, CONNECTION_STRING } = require('./config/constants');
const initDatabase = require('./config/database');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

initDatabase(CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => console.log('Application is running on http://localhost:3000 ...'))
    })
        .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('Application init failed:' + err);
    });