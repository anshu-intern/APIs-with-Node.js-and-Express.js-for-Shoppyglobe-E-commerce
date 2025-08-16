import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
    const JWT_secret = "userSecretKey";

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('JWT ')) {
        return res.status(401).json({ message: "Unauthorised access. Access token missing or malformed" });
    }

    const token = authHeader && authHeader.split(' ')[1];
    
    jwt.verify(token, JWT_secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}
