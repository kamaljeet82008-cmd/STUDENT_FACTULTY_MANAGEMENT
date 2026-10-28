// const express = require('express');
// const router = express.Router();
// router.get('/students');
// router.get('/students/:id');
// // router.post('/students',createstudent);
// router.put('/students/:id');
// router.delete('/students/:id');
// module.exports = router;
const express = require("express");
const router = express.Router();
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
// router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);
module.exports = router;