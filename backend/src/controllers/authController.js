const authService = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const user = req.body;

    authService.createUser(user, (err, result) => {
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

exports.login = (req, res) => {

    const { email, password } = req.body;

    authService.login(email, async (err, users) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        delete user.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    });

};