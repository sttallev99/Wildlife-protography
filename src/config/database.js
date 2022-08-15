const mongoose = require('mongoose');

const initDatabase = function(connectionString) {
    return mongoose.connect(connectionString);
}

module.exports = initDatabase;