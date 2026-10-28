const allowRoles = (...allowedRoles) => { // allowed roles ko receive karta ha
    return async (req, res, next) => { // actual middleware function
        if (!req.user) { // check karta hai ki user authenticated hai ya nahi
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        const userRole = req.user.role; // logged-in user ka role nikalta hai
        if (!allowedRoles.includes(userRole)) { // check karta hai role allowed hai ya nahi
            return res.status(403).json({
                message: "You are not authorized to access this route"
            });
        }
        next(); // role allowed hai, next middleware/controller par jao
    };
};
module.exports = allowRoles; // middleware ko export karta hai