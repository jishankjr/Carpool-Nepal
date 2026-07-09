const express = require("express");

const router = express.Router();

const walletController = require("../controllers/walletController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/my-wallet", authMiddleware, walletController.getMyWallet);

router.get("/my-transactions", authMiddleware, walletController.getMyTransactions);

router.get("/company-wallet", authMiddleware, walletController.getCompanyWallet);

router.get("/company-transactions", authMiddleware, walletController.getCompanyTransactions);

module.exports = router;