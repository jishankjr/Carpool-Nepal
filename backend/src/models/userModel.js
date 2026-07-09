const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.getAllUsers = (callback) => {
    const sql = "SELECT * FROM users";

    db.query(sql, callback);
};

exports.createUser = async (user, callback) => {

    try {

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const sql = `
            INSERT INTO users (full_name, phone, email, password)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                user.full_name,
                user.phone,
                user.email,
                hashedPassword
            ],
            callback
        );

    } catch (err) {
        callback(err, null);
    }

};

exports.findUserByEmail = (email, callback) => {

    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);

};