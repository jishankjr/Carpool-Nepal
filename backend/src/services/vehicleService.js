const vehicleModel = require("../models/vehicleModel");

exports.addVehicle = (vehicle, callback) => {

    vehicleModel.addVehicle(vehicle, (err, result) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);

    });

};

exports.getMyVehicles = (userId, callback) => {

    vehicleModel.getMyVehicles(userId, (err, vehicles) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, vehicles);

    });

};

exports.deleteVehicle = (vehicleId, userId, callback) => {

    vehicleModel.deleteVehicle(vehicleId, userId, (err, result) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);

    });

};

