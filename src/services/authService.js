const bcrypt = require('bcrypt');

const User = require('../models/User');
const { jwtSign } = require('../utils/jwtSign');
const { SECRET } = require('../constants');

exports.createUser = async(userData) => User.create(userData);
exports.loginUser = async(email, password) => {
    return User.findByEmail(email)
        .then(user => Promise.all([bcrypt.compare(password, user.password), user]))
        .then(([isValid, user]) => {
            if(isValid) {
                return user;
            } else {
                throw { message: 'Cannot find username or password'}
            }
        })
        .catch(() => null);
}

exports.createToken = function(user) {
    let payload = {
        _id: user._id,
        email: user.email
    }

    return jwtSign(payload, SECRET);
}