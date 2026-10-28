const Course = require("../models/Course");
// Get all courses
const getAllCourses = async (req, res) => {
    try {
        // Database se saare courses get kar rahe hain
        const courses = await Course.find();

        // Courses successfully milne par response send kar rahe hain
        res.status(200).json({
            message: "Courses fetched successfully",
            courses
        });
 } catch (error) {
        // Agar database me koi error aaye
        res.status(500).json({
            message: error.message
        });
    }
};
// Get a single course using course ID
const getCourseById = async (req, res) => {
    try {
        // URL se course ID lekar database me course search kar rahe hain
        const course = await Course.findById(req.params.id);
        // Agar course nahi mila
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
       // Course mil gaya to uski details send kar rahe hain
        res.status(200).json({
            message: "Course fetched successfully",
            course
        });
    } catch (error) {
        // Agar ID ya database se related koi error aaye
        res.status(500).json({
            message: error.message
        });
    }
};
// Create a new course
const createCourse = async (req, res) => {
    try {
        // Request body se course ka data lekar database me save kar rahe hain
        const course = await Course.create(req.body);
        // Course successfully create hone par response
        res.status(201).json({
            message: "Course created successfully",
            course
        });
    } catch (error) {
        // Agar course data me validation error aaye
        res.status(400).json({
            message: error.message
        });
    }
};
// Update course details
const updateCourse = async (req, res) => {
    try {
        // URL se course ID lekar course ko update kar rahe hain
        const course = await Course.findByIdAndUpdate(
            req.params.id,

            // New course data request body se aa raha hai
            req.body,

            {
                // Updated course ko response me return karega
                new: true,

                // Update ke time schema validation check karega
                runValidators: true
            }
        );
        // Agar course nahi mila
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        // Updated course ka data send kar rahe hain
        res.status(200).json({
            message: "Course updated successfully",
            course
        });
     } catch (error) {
        // Update ke time agar koi error aaye
        res.status(400).json({
            message: error.message
        });
    }
};
// Delete a course
const deleteCourse = async (req, res) => {
    try {
        // Course ID ke basis par course ko delete kar rahe hain
        const course = await Course.findByIdAndDelete(req.params.id);
        // Agar course nahi mila
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        // Course successfully delete hone par response
        res.status(200).json({
            message: "Course deleted successfully"
        });
    } catch (error) {
        // Delete karte time agar koi error aaye
        res.status(500).json({
            message: error.message
        });
    }
};
// Saare controller functions ko export kar rahe hain
// Taaki routes file me inhe use kar saken
module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};