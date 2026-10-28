// const express = require("express");
// const router = express.Router();
// const {
//     registerStudent,
//     loginUser,
//     getCurrentUser,
//     updateCurrentUser
// } = require("../controllers/authController");
// const auth = require("../middleware/auth");
// router.post("/register", registerStudent);
// router.post("/login", loginUser);
// router.get("/me", auth, getCurrentUser);
// router.put("/me", auth, updateCurrentUser);
// module.exports = router;
const express = require("express");
const router = express.Router();
const {
    registerStudent,
    loginUser,
    // getCurrentUser,
    // updateCurrentUser
} = require("../controllers/authController");

router.post("/register", registerStudent);
router.post("/login", loginUser);
// router.get("/me", auth, getCurrentUser);
// router.put("/me", auth, updateCurrentUser);
module.exports = router;