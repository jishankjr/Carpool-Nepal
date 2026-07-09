const userModel = require("../models/userModel");

exports.createUser = (user, callback) => {

    userModel.createUser(user, (err, result) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);

    });

};

exports.login = (email, callback) => {

    userModel.findUserByEmail(email, (err, result) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);

    });

};