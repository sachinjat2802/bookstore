import jwt from 'jsonwebtoken';
import { secretOrKey } from '../config/keys.js';

const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.split(' ')[1], secretOrKey);

        // Add user to request object
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;
