import express from "express";
import * as controller from "../controllers/users.js";
import { loginFormValidation, registerFormValidation, verifyJwt, } from "../middlewares.js";
const router = express.Router();
router
    .get("/", verifyJwt, controller.getAll)
    .post("/login", loginFormValidation, controller.login)
    .delete("/logout", verifyJwt, controller.deleteOne)
    .post("/register", registerFormValidation, controller.createOne);
export default router;
//# sourceMappingURL=users.js.map