import jwt from "../config/jwt.js";

export default function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    jwt.verfityToken(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
        req.user = decoded;
        next();
    })
}