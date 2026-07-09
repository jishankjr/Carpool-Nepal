const express = require("express");

const router = express.Router();

const rideController = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, rideController.createRide);

router.get("/search", rideController.searchRides);

router.get("/:id", rideController.getRideById);

router.put(
    "/complete/:id",
    authMiddleware,
    rideController.completeRide
);

router.put(
    "/confirm/:id",
    authMiddleware,
    rideController.confirmRide
);

module.exports = router;