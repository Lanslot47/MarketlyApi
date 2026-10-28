const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
       "MARKETLYPROJECT",
        {
            expiresIn: "7d",
        }
    );
};


module.exports = generateToken;