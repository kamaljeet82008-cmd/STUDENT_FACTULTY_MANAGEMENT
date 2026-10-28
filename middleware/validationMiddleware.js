const validateRegistration = (req, res, next) => {

    const { name, email, password, role } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "name is required"
        });
    }

    if (!email) {
        return res.status(400).json({
            message: "email is required"
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "password is required"
        });
    }

    // if (!role) {
    //     return res.status(400).json({
    //         message: "role is required"
    //     });
    // }

    if (password.length < 8) {
        return res.status(400).json({
            message: "password must be at least 8 characters"
        });
    }
    if (role && role !== "Student") {
        return res.status(403).json({
            message: "you cannot register with this role"
        });
    }

    next();
};
const validateStudent = (req, res, next) => {

    const {
        name,
        email,
        phone,
        job,
        gender,
        address,
        dob,
        department,
        semester,
        administration,
        status
    } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "email is required"
        });
    }

    if (!phone) {
        return res.status(400).json({
            message: "phone is required"
        });
    }

    if (phone.length !== 10) {
        return res.status(400).json({
            message: "phone must contain 10 digits"
        });
    }

    if (!department) {
        return res.status(400).json({
            message: "department is required"
        });
    }

    if (semester < 1 || semester > 8) {
        return res.status(400).json({
            message: "semester must be between 1 and 8"
        });
    }

    next();
};


module.exports = {
    validateRegistration,
    validateStudent
};