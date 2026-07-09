const walletModel = require("../models/walletModel");
const walletService = require("../services/walletService");

exports.getMyWallet = (req, res) => {

    walletModel.getWalletByUser(req.user.id, (err, wallet) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (wallet.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Wallet not found"
            });
        }

        res.json({
            success: true,
            wallet: wallet[0]
        });

    });

};

exports.getMyTransactions = (req, res) => {

    walletService.getMyTransactions(req.user.id, (err, transactions) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            total: transactions.length,
            transactions
        });

    });

};

exports.getCompanyWallet = (req, res) => {

    walletService.getCompanyWallet((err, wallet) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            wallet: wallet[0]
        });

    });

};

exports.getCompanyTransactions = (req, res) => {

    walletService.getCompanyTransactions((err, transactions) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            total: transactions.length,
            transactions
        });

    });

};