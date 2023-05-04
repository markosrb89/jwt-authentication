import express from "express";

import * as controller from "../controllers/auth.js";
import { verifyJwtCookie } from "../middlewares.js";

const router = express.Router();

router.get("/refresh", verifyJwtCookie, controller.refreshToken);

export default router;
