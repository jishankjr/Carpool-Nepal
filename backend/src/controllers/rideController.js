const rideService = require("../services/rideService");

exports.createRide = (req, res) => {

    const ride = {
        driver_id: req.user.id,
        vehicle_id: req.body.vehicle_id,
        from_location: req.body.from_location,
        to_location: req.body.to_location,
        ride_date: req.body.ride_date,
        ride_time: req.body.ride_time,
        available_seats: req.body.available_seats,
        price: req.body.price
    };

    rideService.createRide(ride, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Ride created successfully",
            rideId: result.insertId
        });

    });

};

exports.searchRides = (req, res) => {

    const { from, to, date } = req.query;

    rideService.searchRides(from, to, date, (err, rides) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            total: rides.length,
            rides
        });

    });

};

exports.getRideById = (req, res) => {

    const { id } = req.params;

    rideService.getRideById(id, (err, ride) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (ride.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });
        }

        res.status(200).json({
            success: true,
            ride: ride[0]
        });

    });

};


exports.completeRide = (req, res) => {

    const rideId = req.params.id;
    const driverId = req.user.id;

    rideService.completeRide(rideId, driverId, (err) => {

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Ride is now awaiting passenger confirmation"
        });

    });

};

exports.confirmRide = (req, res) => {

    const rideId = req.params.id;
    const passengerId = req.user.id;

    rideService.confirmRide(
        rideId,
        passengerId,
        (err) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Passenger confirmation recorded successfully"
            });

        }
    );

};