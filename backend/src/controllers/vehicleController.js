const vehicleService = require("../services/vehicleService");

exports.addVehicle = (req, res) => {

    const vehicle = {
        user_id: req.user.id,
        category: req.body.category,
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        vehicle_number: req.body.vehicle_number,
        seats: req.body.seats,
        is_default: req.body.is_default
    };

    vehicleService.addVehicle(vehicle, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
            vehicleId: result.insertId
        });

    });

};

exports.getMyVehicles = (req, res) => {

    vehicleService.getMyVehicles(req.user.id, (err, vehicles) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            total: vehicles.length,
            vehicles
        });

    });

};

exports.deleteVehicle = (req, res) => {

    const vehicleId = req.params.id;

    vehicleService.deleteVehicle(
        vehicleId,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Vehicle not found"
                });
            }

            res.json({
                success: true,
                message: "Vehicle deleted successfully"
            });

        }
    );

};