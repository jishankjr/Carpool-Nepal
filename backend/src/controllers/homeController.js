const homeService = require("../services/homeService");

exports.home = (req, res) => {
    homeService.getHomeMessage((err, users) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        res.json({
            success: true,
            totalUsers: users.length,
            users: users
        });
    });
};

exports.signup = (req, res) => {

    const user = req.body;

    homeService.createUser(user, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: result.insertId
        });

    });

};