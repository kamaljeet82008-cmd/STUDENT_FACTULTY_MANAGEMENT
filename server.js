require("dotenv").config(); // .env ki information load karni
const express = require("express"); // Express import
const mongoose = require("mongoose"); // MongoDB se connect karne ke liye
const app = express();
app.use(express.json()); // JSON request read karne ke liye
// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));
// Student routes
app.use("/api", require("./routes/studentRoutes"));
// Course routes
app.use("/api", require("./routes/courseRoutes"))
// Faculty routes
app.use("/api", require("./routes/facultyRoutes"));
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log(
                `Server running on port ${process.env.PORT || 5000}`
            );
        });
    })
    .catch((err) => {
        console.error(
            "MongoDB connection failed:",
            err.message
        );
    });