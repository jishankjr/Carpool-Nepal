const db = require("../config/db");

exports.addVehicle = (vehicle, callback) => {

    const sql = `
        INSERT INTO vehicles
        (
            user_id,
            category,
            brand,
            model,
            color,
            vehicle_number,
            seats,
            is_default
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            vehicle.user_id,
            vehicle.category,
            vehicle.brand,
            vehicle.model,
            vehicle.color,
            vehicle.vehicle_number,
            vehicle.seats,
            vehicle.is_default
        ],
        callback
    );

};

exports.getMyVehicles = (userId, callback) => {

    const sql = `
        SELECT *
        FROM vehicles
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], callback);

};

exports.deleteVehicle = (vehicleId, userId, callback) => {

    const sql = `
        DELETE FROM vehicles
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [vehicleId, userId], callback);

};

