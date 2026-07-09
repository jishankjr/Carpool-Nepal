const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicleController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/add",
    authMiddleware,
    vehicleController.addVehicle
);

router.get(
    "/my-vehicles",
    authMiddleware,
    vehicleController.getMyVehicles
);

router.delete(
    "/delete/:id",
    authMiddleware,
    vehicleController.deleteVehicle
);

module.exports = router;