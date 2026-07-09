const db = require("../config/db");

exports.createRequest = (rideRequest, callback) => {

    const sql = `
        INSERT INTO ride_requests
        (
            ride_id,
            passenger_id
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            rideRequest.ride_id,
            rideRequest.passenger_id
        ],
        callback
    );

};

exports.getDriverRequests = (driverId, callback) => {

    const sql = `
        SELECT

            rr.id,
            rr.status,
            rr.requested_at,

            r.id AS ride_id,
            r.from_location,
            r.to_location,
            r.ride_date,
            r.ride_time,

            u.id AS passenger_id,
            u.full_name,
            u.phone,
            u.rating

        FROM ride_requests rr

        JOIN rides r
            ON rr.ride_id = r.id

        JOIN users u
            ON rr.passenger_id = u.id

        WHERE r.driver_id = ?

        ORDER BY rr.requested_at DESC
    `;

    db.query(sql, [driverId], callback);

};

exports.getRideOwner = (rideId, callback) => {

    const sql = `
        SELECT driver_id
        FROM rides
        WHERE id = ?
    `;

    db.query(sql, [rideId], callback);

};

exports.acceptRequest = (requestId, callback) => {

    const sql = `
        UPDATE ride_requests
        SET status = 'accepted'
        WHERE id = ?
    `;

    db.query(sql, [requestId], callback);

};

exports.getRequestById = (requestId, callback) => {

    const sql = `
        SELECT ride_id
        FROM ride_requests
        WHERE id = ?
    `;

    db.query(sql, [requestId], callback);

};

exports.rejectRequest = (requestId, callback) => {

    const sql = `
        UPDATE ride_requests
        SET status = 'rejected'
        WHERE id = ?
    `;

    db.query(sql, [requestId], callback);

};

exports.checkExistingRequest = (rideId, passengerId, callback) => {

    const sql = `
        SELECT id
        FROM ride_requests
        WHERE ride_id = ?
        AND passenger_id = ?
        AND status IN ('pending', 'accepted')
    `;

    db.query(sql, [rideId, passengerId], callback);

};

exports.cancelRequest = (requestId, callback) => {

    const sql = `
        UPDATE ride_requests
        SET status = 'cancelled'
        WHERE id = ?
    `;

    db.query(sql, [requestId], callback);

};

exports.getRequestDetails = (requestId, callback) => {

    const sql = `
        SELECT
            ride_id,
            status
        FROM ride_requests
        WHERE id = ?
    `;

    db.query(sql, [requestId], callback);

};

exports.getPassengerHistory = (passengerId, callback) => {

    const sql = `
        SELECT

            rr.id AS request_id,
            rr.status,
            rr.requested_at,

            r.id AS ride_id,
            r.from_location,
            r.to_location,
            r.ride_date,
            r.ride_time,
            r.price,

            u.full_name AS driver_name,
            u.phone AS driver_phone,
            u.rating AS driver_rating

        FROM ride_requests rr

        JOIN rides r
            ON rr.ride_id = r.id

        JOIN users u
            ON r.driver_id = u.id

        WHERE rr.passenger_id = ?

        ORDER BY rr.requested_at DESC
    `;

    db.query(sql, [passengerId], callback);

};

exports.isAcceptedPassenger = (rideId, passengerId, callback) => {

    const sql = `
        SELECT *
        FROM ride_requests
        WHERE ride_id = ?
        AND passenger_id = ?
        AND status = 'accepted'
    `;

    db.query(sql, [rideId, passengerId], callback);

};

exports.countPendingConfirmations = (rideId, callback) => {

    const sql = `
        SELECT COUNT(*) AS total
        FROM ride_requests
        WHERE ride_id = ?
        AND status = 'accepted'
    `;

    db.query(sql, [rideId], callback);

};

exports.confirmPassenger = (rideId, passengerId, callback) => {

    const sql = `
        UPDATE ride_requests
        SET is_confirmed = TRUE
        WHERE ride_id = ?
        AND passenger_id = ?
    `;

    db.query(sql, [rideId, passengerId], callback);

};

exports.countUnconfirmedPassengers = (rideId, callback) => {

    const sql = `
        SELECT COUNT(*) AS total
        FROM ride_requests
        WHERE ride_id = ?
        AND status = 'accepted'
        AND is_confirmed = FALSE
    `;

    db.query(sql, [rideId], callback);

};

exports.hasPassengerConfirmed = (rideId, passengerId, callback) => {

    const sql = `
        SELECT is_confirmed
        FROM ride_requests
        WHERE ride_id = ?
        AND passenger_id = ?
    `;

    db.query(sql, [rideId, passengerId], callback);

};

