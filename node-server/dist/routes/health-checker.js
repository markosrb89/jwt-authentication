import express from "express";
import * as controller from "../controllers/health-checker.js";
const router = express.Router();
router.get("/", controller.healthChecker);
export default router;
//# sourceMappingURL=health-checker.js.map