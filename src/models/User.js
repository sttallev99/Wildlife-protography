const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next()
        });
});

userSchema.virtual('repeatPassword').set(function(v) {
    if(v !== this.password) {
        throw new Error('Both password must be same!');
    }
});

userSchema.static('findByEmail', function(email) {
    return this.findOne({email});
})

const User = mongoose.model('User', userSchema);

module.exports = User;