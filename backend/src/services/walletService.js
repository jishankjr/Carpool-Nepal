const walletModel = require("../models/walletModel");

exports.processRidePayment = (
    driverId,
    rideId,
    fare,
    callback
) => {

    walletModel.getWalletByUser(driverId, (err, wallet) => {

        if (err) {
            callback(err);
            return;
        }

        if (wallet.length === 0) {
            callback(new Error("Driver wallet not found"));
            return;
        }

        const walletId = wallet[0].id;

        const serviceFee = fare * 0.03;
        const driverAmount = fare - serviceFee;

        walletModel.creditWallet(
            walletId,
            driverAmount,
            (err) => {

                if (err) {
                    callback(err);
                    return;
                }

                walletModel.creditCompanyWallet(
                    serviceFee,
                    (err) => {

                        if (err) {
                            callback(err);
                            return;
                        }

                        walletModel.addTransaction(
                            walletId,
                            rideId,
                            driverAmount,
                            "credit",
                            "Ride payment",
                            (err) => {

                                if (err) {
                                    callback(err);
                                    return;
                                }

                                callback(null);

                            }

                        );

                    }

                );

            }

        );

    });

};

exports.getMyTransactions = (userId, callback) => {

    walletModel.getWalletByUser(userId, (err, wallet) => {

        if (err) {
            callback(err);
            return;
        }

        if (wallet.length === 0) {
            callback(new Error("Wallet not found"));
            return;
        }

        walletModel.getTransactions(wallet[0].id, callback);

    });

};

exports.getCompanyWallet = (callback) => {

    walletModel.getCompanyWallet(callback);

};

exports.getCompanyTransactions = (callback) => {

    walletModel.getCompanyTransactions(callback);

};