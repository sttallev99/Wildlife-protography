const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { PORT, CONNECTION_STRING } = require('./config/constants');
const initDatabase = require('./config/database');
const initHandlebars = require('./config/express-handlebars');
const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);
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