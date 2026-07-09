const express = require("express");

const router = express.Router();

const rideRequestController = require("../controllers/rideRequestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/create",
    authMiddleware,
    rideRequestController.createRequest
);

router.get(
    "/my-requests",
    authMiddleware,
    rideRequestController.getDriverRequests
);

router.put(
    "/accept/:id",
    authMiddleware,
    rideRequestController.acceptRequest
);

router.put(
    "/reject/:id",
    authMiddleware,
    rideRequestController.rejectRequest
);

router.put(
    "/cancel/:id",
    authMiddleware,
    rideRequestController.cancelRequest
);

router.get(
    "/history",
    authMiddleware,
    rideRequestController.getPassengerHistory
);

module.exports = router;