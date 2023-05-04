import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/users.js";
// Register user
export async function createOne(req, res, next) {
    console.log("createOne: [POST] /users/register");
    const { full_name, email, password } = req.body;
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });
    if (alreadyExistsUser) {
        next({ message: "User with provided email already exists!" });
        // return res.status(409).json({
        //   success: false,
        //   error: { message: "User with email already exists!" },
        // });
    }
    const USER_MODEL = {
        full_name: full_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
    };
    try {
        const savedUser = await User.create(USER_MODEL);
        const { password, ...userData } = savedUser;
        return res.status(201).json({ success: true, payload: { user: userData } });
    }
    catch (error) {
        console.log("ERROR in createOne ", error);
        next({ message: "Cannot register user at the moment!" });
        // return res.status(500).json({
        //   success: false,
        //   error: { message: "Cannot register user at the moment!" },
        // });
    }
}
// Login user
export async function login(req, res, next) {
    console.log("login: [POST] /users/login");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        });
        if (!user) {
            next({ message: "User not found!" });
            // return res.status(400).json({
            //   success: false,
            //   error: { message: "User not found!" },
            // });
        }
        if (!bcrypt.compareSync(req.body.password, user.dataValues.password)) {
            next({
                message: "Invalid email or password. Please try again with the correct credentials.",
            });
            // return res.status(400).json({
            //   success: false,
            //   error: {
            //     message: "Password does not match!",
            //   },
            // });
        }
        console.log("OK login USER: ", user);
        const token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.password }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const { password, ...userData } = user;
        return res
            .status(200)
            .json({ success: true, payload: { user: userData, token } });
    }
    catch (error) {
        console.log("ERROR in login ", error);
        next(error);
        // return res
        //   .status(500)
        //   .json({ success: false, error: { message: error.message } });
    }
}
// Logout/delete user
export async function deleteOne(req, res, next) {
    console.log("[DELETE] /users/:id");
    const authHeader = req.headers["authorization"];
    try {
        await User.destroy({ where: { id: req.params.id } });
        jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, errorMessage) => {
            if (logout) {
                return res.status(200).json({
                    sucess: true,
                    payload: { message: "You have been Logged Out" },
                });
            }
            else {
                next({ message: errorMessage });
            }
        });
    }
    catch (error) {
        console.log("ERROR in deleteOne " + "USER:", error);
        next(error);
        // return res
        //   .status(500)
        //   .json({ success: false, error: { message: error.message } });
    }
}
export async function getAll(_, res, next) {
    console.log("getAll: [GET] /users/");
    try {
        const users = await User.findAll();
        return res.status(200).json({ success: true, payload: { users } });
    }
    catch (error) {
        console.log("ERROR in getAll " + "USER:", error);
        next(error);
        // return res.status(500).json(error);
    }
}
//# sourceMappingURL=users.js.map