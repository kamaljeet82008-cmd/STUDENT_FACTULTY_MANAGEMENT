const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const {
    hashPassword,
    comparePassword,
    generateToken
} = require("../utils/authUtils");
const registerStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        const hashedPassword = await hashPassword(password);
        const student = await Student.create({
            ...req.body,
            password: hashedPassword,
            role: "Student"
        });
        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const loginUser = async (req, res) => {
    try {

        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required"
            });
        }

        let user;
        if (role === "Student") {
            user = await Student.findOne({ email }).select("+password");
        }
        else if (role === "faculty" || role === "admin") {
            user = await Faculty.findOne({ email }).select("+password");
        }
        else {
            return res.status(400).json({
                message: "Invalid role"
            });

        }
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const isMatch = await comparePassword(
            password,
            user.password
        );
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = generateToken(
            user._id,
            user.role
        );
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};
const getCurrentUser = async (req, res) => {
    try {
        const { userId, role } = req.user;
        let user;
        if (role === "Student") {

            user = await Student.findById(userId);

        }
        else if (role === "faculty" || role === "admin") {
                user = await Faculty.findById(userId);

        }
        else {

            return res.status(400).json({
                message: "Invalid role"
            });

        }
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Current user fetched successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};
const updateCurrentUser = async (req, res) => {
    try {
        const { userId, role } = req.user;
        let updatedUser;
        if (role === "Student") {
            updatedUser = await Student.findByIdAndUpdate(
                userId,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        else if (role === "faculty" || role === "admin") {
            updatedUser = await Faculty.findByIdAndUpdate(userId,req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        }
        else {

            return res.status(400).json({
                message: "Invalid role"
            });

        }
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};
module.exports = {
    registerStudent,
    loginUser,
    getCurrentUser,
    updateCurrentUser
};
