const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Role-based access
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Admin only' });
    }
    next();
};

exports.isUser = (req, res, next) => {
    if (req.user.role !== 'USER') {
        return res.status(403).json({ message: 'User only' });
    }
    next();
};

exports.isOwner = (req, res, next) => {
    if (req.user.role !== 'OWNER') {
        return res.status(403).json({ message: 'Owner only' });
    }
    next();
};