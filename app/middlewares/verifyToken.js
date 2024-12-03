const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const rawToken = req.headers.authorization;
    const token = rawToken && rawToken.split(' ')[1];
    if (!token) {
        return res.status(403).json({ status: 'error', message: 'unauthorized' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: err.message });
        }
        req.user = decoded;
        next();
    });
}