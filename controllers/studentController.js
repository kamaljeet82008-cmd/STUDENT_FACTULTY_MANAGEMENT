const Student = require("../models/Student");
// Get all students
const getAllStudents = async (req, res) => {
    try {
        // Database se saare students nikal rahe hain
        const students = await Student.find();
        // Students mil jaane par response send kar rahe hain
        res.status(200).json({
            message: "Students fetched successfully",
            students
        });
    } catch (error) {
        // Agar database me koi problem aaye
        res.status(500).json({
            message: error.message
        });
    }
};
// Get a single student using student ID
const getStudentById = async (req, res) => {
    try {
        // URL se id le kar database me student search kar rahe hain
        const student = await Student.findById(req.params.id);
       // Agar given ID ka student nahi mila
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        // Student mil gaya to uski details send kar rahe hain
        res.status(200).json({
            message: "Student fetched successfully",
            student
        });
      } catch (error) {
        // Invalid ID ya database error ke case me
        res.status(500).json({
            message: error.message
        });
    }
};
// Create a new student
// const createStudent = async (req, res) => {
//     try {
//         // Request body se student ka data lekar database me save kar rahe hain
//         const student = await Student.create(req.body);
//         // Student successfully create hone par response
//         res.status(201).json({
//             message: "Student created successfully",
//             student//shorthanded js property
//         });
//         } catch (error) {
//         // Agar data validation me koi problem aaye
//         res.status(400).json({
//             message: error.message
//         });
//     }
// };
// Update student details
const updateStudent = async (req, res) => {
    try {
        // URL se student ID lekar us student ko update kar rahe hain
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            // New data request body se aa raha hai
            req.body,
            {
                // Updated student ko response me return karega
                new: true,//updated document return karo
                // Update ke time schema validations bhi check hongi
                runValidators: true //- update karde time schema di validation check karo
            }
        );
    // Agar student nahi mila
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        // Updated student ka data send kar rahe hain
        res.status(200).json({
            message: "Student updated successfully",
            student
        });
   } catch (error) {
        // Agar update karte time koi error aaye
        res.status(400).json({
            message: error.message
        });
    }
};
// Delete a student
const deleteStudent = async (req, res) => {
    try {
        // ID ke basis par student ko database se delete kar rahe hain
        const student = await Student.findByIdAndDelete(req.params.id);
        // Agar given ID ka student nahi mila
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Student successfully delete hone par response
        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        // Delete karte time agar koi server/database error aaye
        res.status(500).json({
            message: error.message
        });
    }
};
// Sabhi controller functions ko export kar rahe hain
// Taaki routes file me in functions ko use kar saken
module.exports = {
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};