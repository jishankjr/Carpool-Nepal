const db = require("../config/db");

exports.createRide = (ride, callback) => {

    const sql = `
        INSERT INTO rides
        (
            driver_id,
            vehicle_id,
            from_location,
            to_location,
            ride_date,
            ride_time,
            available_seats,
            price
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            ride.driver_id,
            ride.vehicle_id,
            ride.from_location,
            ride.to_location,
            ride.ride_date,
            ride.ride_time,
            ride.available_seats,
            ride.price
        ],
        callback
    );

};

exports.searchRides = (from, to, date, callback) => {

    const sql = `
        SELECT
            rides.id,
            rides.from_location,
            rides.to_location,
            rides.ride_date,
            rides.ride_time,
            rides.available_seats,
            rides.price,

            users.full_name,
            users.rating,

            vehicles.brand,
            vehicles.model,
            vehicles.color

        FROM rides

        JOIN users
            ON rides.driver_id = users.id

        JOIN vehicles
            ON rides.vehicle_id = vehicles.id

        WHERE rides.from_location = ?
          AND rides.to_location = ?
          AND rides.ride_date = ?
          AND rides.status = 'scheduled'
    `;

    db.query(sql, [from, to, date], callback);

};

exports.getRideById = (id, callback) => {

    const sql = `
        SELECT
            rides.*,

            users.full_name,
            users.phone,
            users.rating,

            vehicles.brand,
            vehicles.model,
            vehicles.color,
            vehicles.vehicle_number

        FROM rides

        JOIN users
            ON rides.driver_id = users.id

        JOIN vehicles
            ON rides.vehicle_id = vehicles.id

        WHERE rides.id = ?
    `;

    db.query(sql, [id], callback);

};

exports.decreaseSeat = (rideId, callback) => {

    const sql = `
        UPDATE rides
        SET available_seats = available_seats - 1
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.getAvailableSeats = (rideId, callback) => {

    const sql = `
        SELECT available_seats
        FROM rides
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.increaseSeat = (rideId, callback) => {

    const sql = `
        UPDATE rides
        SET available_seats = available_seats + 1
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.markAwaitingConfirmation = (rideId, callback) => {

    const sql = `
        UPDATE rides
        SET status = 'awaiting_confirmation'
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.markCompleted = (rideId, callback) => {

    const sql = `
        UPDATE rides
        SET status = 'completed'
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.getRideByIdOnly = (rideId, callback) => {

    const sql = `
        SELECT id, driver_id, status
        FROM rides
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.countAcceptedPassengers = (rideId, callback) => {

    const sql = `
        SELECT COUNT(*) AS total
        FROM ride_requests
        WHERE ride_id = ?
        AND status = 'accepted'
    `;

    db.query(sql, [rideId], callback);

};

exports.getRidePrice = (rideId, callback) => {

    const sql = `
        SELECT
            driver_id,
            price
        FROM rides
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};