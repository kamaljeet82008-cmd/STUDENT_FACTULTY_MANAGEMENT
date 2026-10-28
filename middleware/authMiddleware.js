const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "no token provided"
            });
        }
        const token = authHeader.split(" ")[1]; // "Bearer TOKEN" me se sirf TOKEN nikalta hai//splitt ka use v pta lg igya
        if (!token) { // check karta hai ki token mila bhi hai ya nahi
            return res.status(401).json({ // token nahi mila, isliye Unauthorized response
                message: "invaild token"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // token ko verify karke uske andar ka data decode karta hai
        req.user = decoded; // verified token ka userId aur role req.user mein store karta hai
        next();

    }
    catch (error) {
        return res.status(401).json({ // token invalid ya expired hai, isliye Unauthorized response
            message: "inviald or expired token "
        });
    }
}    
module.exports = protect; // protect middleware ko doosri files mein use karne ke liye export karta hai