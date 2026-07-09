const walletService = require("./walletService");
const rideRequestModel = require("../models/rideRequestModel");
const rideModel = require("../models/rideModel");

exports.createRide = (ride, callback) => {

    rideModel.createRide(ride, (err, result) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);

    });

};

exports.searchRides = (from, to, date, callback) => {

    rideModel.searchRides(from, to, date, (err, rides) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, rides);

    });

};

exports.getRideById = (id, callback) => {

    rideModel.getRideById(id, (err, ride) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, ride);

    });

};

exports.completeRide = (rideId, driverId, callback) => {

    rideModel.getRideByIdOnly(rideId, (err, ride) => {

        if (err) {
            callback(err);
            return;
        }

        if (ride.length === 0) {
            callback(new Error("Ride not found"));
            return;
        }

        if (ride[0].driver_id != driverId) {
            callback(new Error("Only the ride owner can complete this ride"));
            return;
        }

        if (ride[0].status !== "scheduled") {
            callback(new Error("Ride cannot be completed"));
            return;
        }

        rideModel.countAcceptedPassengers(rideId, (err, result) => {

            if (err) {
                callback(err);
                return;
            }

            if (result[0].total == 0) {
                callback(new Error("No accepted passengers"));
                return;
            }

            rideModel.markAwaitingConfirmation(rideId, callback);

        });

    });

};

exports.confirmRide = (rideId, passengerId, callback) => {

    rideModel.getRideByIdOnly(rideId, (err, ride) => {

        if (err) {
            callback(err);
            return;
        }

        if (ride.length === 0) {
            callback(new Error("Ride not found"));
            return;
        }

        if (ride[0].status !== "awaiting_confirmation") {
            callback(new Error("Ride is not awaiting confirmation"));
            return;
        }

        rideRequestModel.isAcceptedPassenger(
            rideId,
            passengerId,
            (err, request) => {

                if (err) {
                    callback(err);
                    return;
                }

                if (request.length === 0) {
                    callback(new Error("You are not allowed to confirm this ride"));
                    return;
                }

                rideRequestModel.hasPassengerConfirmed(
                    rideId,
                    passengerId,
                    (err, confirmed) => {

                        if (err) {
                            callback(err);
                            return;
                        }

                        if (confirmed[0].is_confirmed) {
                            callback(new Error("You already confirmed this ride"));
                            return;
                        }

                        rideRequestModel.confirmPassenger(
                            rideId,
                            passengerId,
                            (err) => {

                                if (err) {
                                    callback(err);
                                    return;
                                }

                                rideRequestModel.countUnconfirmedPassengers(
                                    rideId,
                                    (err, result) => {

                                        if (err) {
                                            callback(err);
                                            return;
                                        }

                                        if (result[0].total == 0) {
                                            rideModel.markCompleted(rideId, (err) => {

    if (err) {
        callback(err);
        return;
    }

    rideModel.getRidePrice(rideId, (err, ride) => {

        if (err) {
            callback(err);
            return;
        }

        walletService.processRidePayment(
            ride[0].driver_id,
            rideId,
            Number(ride[0].price),
            callback
        );

    });

});
                                        } else {
                                            callback(null);
                                        }

                                    }
                                );

                            }
                        );

                    }
                );

            }
        );

    });

};