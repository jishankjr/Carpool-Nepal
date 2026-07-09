const db = require("../config/db");

exports.getWalletByUser = (userId, callback) => {

    const sql = `
        SELECT *
        FROM wallets
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);

};

exports.creditWallet = (walletId, amount, callback) => {

    const sql = `
        UPDATE wallets
        SET balance = balance + ?
        WHERE id = ?
    `;

    db.query(sql, [amount, walletId], callback);

};

exports.debitWallet = (walletId, amount, callback) => {

    const sql = `
        UPDATE wallets
        SET balance = balance - ?
        WHERE id = ?
    `;

    db.query(sql, [amount, walletId], callback);

};

exports.creditCompanyWallet = (amount, callback) => {

    const sql = `
        UPDATE company_wallet
        SET balance = balance + ?
        WHERE id = 1
    `;

    db.query(sql, [amount], callback);

};

exports.addTransaction = (
    walletId,
    rideId,
    amount,
    type,
    description,
    callback
) => {

    const sql = `
        INSERT INTO transactions
        (
            wallet_id,
            ride_id,
            amount,
            type,
            description
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            walletId,
            rideId,
            amount,
            type,
            description
        ],
        callback
    );

};

exports.getTransactions = (walletId, callback) => {

    const sql = `
        SELECT *
        FROM transactions
        WHERE wallet_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [walletId], callback);

};

exports.getCompanyWallet = (callback) => {

    const sql = `
        SELECT *
        FROM company_wallet
        WHERE id = 1
    `;

    db.query(sql, callback);

};

exports.getCompanyTransactions = (callback) => {

    const sql = `
        SELECT *
        FROM transactions
        ORDER BY id DESC
    `;

    db.query(sql, callback);

};

