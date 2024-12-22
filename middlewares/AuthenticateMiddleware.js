// middleware/authenticate.js
import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
    try {
        // Check if token is provided in headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};
