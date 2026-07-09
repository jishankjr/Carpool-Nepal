const userModel = require("../models/userModel");

exports.getHomeMessage = (callback) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, results);
    });
};

exports.createUser = (user, callback) => {
    userModel.createUser(user, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);
    });
};