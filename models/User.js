const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

/** The user schema attributes / characteristics / fields */
var UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,


    profile: {
        name: { type: String, default: "" },
        picture: { type: String, default: "" }
    },

    address: String,
    hoistory: [{
        date: Date,
        paid: { type: Number, default: 0 }
    }]
});

/** Hash the password even before we save it to the database */
UserSchema.pre('save', (next) => {
    let user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(21, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/** Compare password to the database and that the user insert it to */
UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);