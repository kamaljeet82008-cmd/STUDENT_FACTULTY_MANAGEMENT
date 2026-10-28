const express = require("express");
const router = express.Router();
const {
    getAllFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty
} = require("../controllers/facultyController");
// GET all faculty
router.get("/faculty", getAllFaculty);
// GET faculty by ID
router.get("/faculty/:id", getFacultyById);

// POST create faculty
router.post("/faculty", createFaculty);

// PUT update faculty
router.put("/faculty/:id", updateFaculty);

// DELETE faculty
router.delete("/faculty/:id", deleteFaculty);


module.exports = router;