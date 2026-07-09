const rideRequestModel = require("../models/rideRequestModel");
const rideModel = require("../models/rideModel");

exports.createRequest = (rideRequest, callback) => {

    rideRequestModel.getRideOwner(rideRequest.ride_id, (err, owner) => {

        if (err) {
            callback(err, null);
            return;
        }

        if (owner.length === 0) {
            callback(new Error("Ride not found"), null);
            return;
        }

        if (owner[0].driver_id === rideRequest.passenger_id) {
            callback(new Error("You cannot request your own ride"), null);
            return;
        }

        // rideRequestModel.createRequest(rideRequest, callback);
        rideRequestModel.checkExistingRequest(
    rideRequest.ride_id,
    rideRequest.passenger_id,
    (err, existing) => {

        if (err) {
            callback(err, null);
            return;
        }

        if (existing.length > 0) {
            callback(
                new Error("You have already requested this ride"),
                null
            );
            return;
        }

        rideRequestModel.createRequest(rideRequest, callback);

    }
);

    });

};

exports.getDriverRequests = (driverId, callback) => {

    rideRequestModel.getDriverRequests(driverId, callback);

};

exports.acceptRequest = (requestId, callback) => {

    rideRequestModel.acceptRequest(requestId, (err) => {

        if (err) {
            callback(err, null);
            return;
        }

        rideRequestModel.getRequestById(requestId, (err, request) => {

            if (err) {
                callback(err, null);
                return;
            }

            // rideModel.decreaseSeat(request[0].ride_id, callback);
                    rideModel.getAvailableSeats(request[0].ride_id, (err, seats) => {

            if (err) {
                callback(err, null);
                return;
            }

            if (seats[0].available_seats <= 0) {
                callback(new Error("No seats available"), null);
                return;
            }

            rideModel.decreaseSeat(request[0].ride_id, callback);

        });

        });

    });

};

exports.rejectRequest = (requestId, callback) => {

    rideRequestModel.rejectRequest(requestId, (err, result) => {

        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);

    });

};

exports.cancelRequest = (requestId, callback) => {

    rideRequestModel.getRequestDetails(requestId, (err, request) => {

        if (err) {
            callback(err, null);
            return;
        }

        if (request.length === 0) {
            callback(new Error("Ride request not found"), null);
            return;
        }

        if (request[0].status === "accepted") {

            rideModel.increaseSeat(request[0].ride_id, (err) => {

                if (err) {
                    callback(err, null);
                    return;
                }

                rideRequestModel.cancelRequest(requestId, callback);

            });

        } else {

            rideRequestModel.cancelRequest(requestId, callback);

        }

    });

};

exports.getPassengerHistory = (passengerId, callback) => {

    rideRequestModel.getPassengerHistory(passengerId, callback);

};

