const rideRequestService = require("../services/rideRequestService");

exports.createRequest = (req, res) => {

    const rideRequest = {
        ride_id: req.body.ride_id,
        passenger_id: req.user.id
    };

    rideRequestService.createRequest(rideRequest, (err, result) => {

        if (err) {

            // if (
            //     err.message === "Ride not found" ||
            //     err.message === "You cannot request your own ride"
            // ) {
                if (
                    err.message === "Ride not found" ||
                    err.message === "You cannot request your own ride" ||
                    err.message === "You have already requested this ride"
                ) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.status(201).json({
            success: true,
            message: "Ride request sent successfully",
            requestId: result.insertId
        });

    });

};

exports.getDriverRequests = (req, res) => {

    rideRequestService.getDriverRequests(req.user.id, (err, requests) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            totalRequests: requests.length,
            requests
        });

    });

};

exports.acceptRequest = (req, res) => {

    const { id } = req.params;

    rideRequestService.acceptRequest(id, (err) => {

        if (err) {

    if (err.message === "No seats available") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message
    });

}

        res.json({
            success: true,
            message: "Ride request accepted successfully"
        });

    });

};

exports.rejectRequest = (req, res) => {

    const { id } = req.params;

    rideRequestService.rejectRequest(id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Ride request rejected successfully"
        });

    });

};

exports.cancelRequest = (req, res) => {

    const requestId = req.params.id;

    rideRequestService.cancelRequest(requestId, (err) => {

        if (err) {

            if (err.message === "Ride request not found") {
                return res.status(404).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            message: "Ride request cancelled successfully"
        });

    });

};

exports.getPassengerHistory = (req, res) => {

    const passengerId = req.user.id;

    rideRequestService.getPassengerHistory(passengerId, (err, history) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            total: history.length,
            history
        });

    });

};

