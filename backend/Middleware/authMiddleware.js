const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) return res.status(401).json({ msg: "Invalid action" });

        jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, decoded) => {
            if (err) return res.status(401).json({ msg: "Token is not valid" });

            req.user = decoded;
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authMiddleware;