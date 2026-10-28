const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs");
// 1. Get all faculty
const getAllFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find();

        res.status(200).json({
            message: "Faculty fetched successfully",
            faculties
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// 2. Get faculty by ID
const getFacultyById = async (req, res) => {
    try {
        const faculties = await Faculty.findById(req.params.id);

        if (!faculties) {
            return res.status(404).json({
                message: "Faculty not found"
            });
        }
        res.status(200).json({
            message: "Faculty fetched successfully",
            faculties
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// 3. Create faculty
const createFaculty = async (req, res) => {
    try {
        const {password} = req.body;
        const faculties = await Faculty.create(req.body);

        res.status(201).json({
            message: "Faculty created successfully",
            faculties
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// 4. Update faculty
const updateFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!faculties) {
            return res.status(404).json({
                message: "Faculty not found"
            });
        }

        res.status(200).json({
            message: "Faculty updated successfully",
            faculties
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// 5. Delete faculty
const deleteFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.findByIdAndDelete(
            req.params.id
        );

        if (!faculties) {
            return res.status(404).json({
                message: "Faculty not found"
            });
        }
        res.status(200).json({
            message: "Faculty deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    getAllFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty
};