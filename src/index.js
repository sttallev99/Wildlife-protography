const express = require('express');
const path = require('path');

const { PORT, CONNECTION_STRING } = require('./config/constants');
const initDatabase = require('./config/database');
const initHandlebars = require('./config/express-handlebars');
const routes = require('./routes');


const app = express();
initHandlebars(app);
app.use(express.static(path.join(__dirname, './static')));
app.use(routes);

initDatabase(CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => console.log('Application is running on http://localhost:3000 ...'))
    })
        .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('Application init failed:' + err);
    });