import jwt from "jsonwebtoken";
import { body } from "express-validator";
export function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}
export function errorHandler(err, _req, res) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
}
export function verifyJwt(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        next();
    });
}
export function loginFormValidation() {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail(),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password Must Be at Least 8 Characters")
            .matches("[0-9]")
            .withMessage("Password Must Contain a Number")
            .matches("[a-zA-Z]")
            .withMessage("Password Must Contain At Least One Letter")
            .trim()
            .escape(),
    ];
}
export function registerFormValidation() {
    return [
        body("full_name")
            .notEmpty()
            .withMessage("Name is required")
            .trim()
            .escape(),
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail(),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password Must Be at Least 8 Characters")
            .matches("[0-9]")
            .withMessage("Password Must Contain a Number")
            .matches("[a-zA-Z]")
            .withMessage("Password Must Contain At Least One Letter")
            .trim()
            .escape(),
    ];
}
//# sourceMappingURL=middlewares.js.map