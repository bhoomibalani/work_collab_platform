const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

const signupController = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, role, email, userName, password } = req.body;

        if (!firstName || !role || !email || !userName || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide All fields",
            });
        }

        //check if user already exist
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email already exist",
            });
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
        const user = await userModel.create({
            firstName,
            lastName,
            role,
            userName,
            email,
            password: hashedPassword,
        });

        res.status(201).send({
            success: true,
            message: "user registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in signUp API",
            error,
        });
    }
};


//login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        //token
        const token = JWT.sign({ id: user._id ,role:user.role}, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API ",
            error,
        })
    }
};

module.exports = { signupController, loginController };
