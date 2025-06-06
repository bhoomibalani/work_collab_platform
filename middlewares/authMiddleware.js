const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).send({
                success: false,
                message: "Authorization token missing or malformed",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "unauthorised user",
                });
            } else {
                req.user = decode;
                console.log("decode", decode);
                next();
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Authentication Middleware",
            error: error.message,
        });
    }
};

module.exports =requireAuth;