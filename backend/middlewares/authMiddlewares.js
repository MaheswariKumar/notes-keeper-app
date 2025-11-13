const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message : "Invalid Access token"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message : "Invalid Token & Unauthrorized"
            })
            }

            req.userId = decoded.id
            next();
        })

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports = {
    verifyToken
}