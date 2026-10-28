const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password:{
        type:String ,
        required:true,
        select: false
    },
    role:{
        type:String,
        required: true,
        enum:["Student"]
    },


    job: {
        type: String,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    dob: {
        type: Date,
        required: true
    },

    department: {
        type: String,
        required: true,
        trim: true
    },

    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },

    administration: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"]
    },

    role: {
        type: String,
        required: true,
        enum: ["Student"]
    }
});

module.exports = mongoose.model("Student", studentSchema);