const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};
const generateToken = (userId, role) => {
    const token = jwt.sign(
        {
            userId: userId,
            role: role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return token;
};
module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};