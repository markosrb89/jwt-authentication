import express from "express";

import * as controller from "../controllers/users.js";
import { verifyJwt } from "../middlewares.js";

const router = express.Router();

router
  .post("/login", controller.login)
  .get("/", verifyJwt, controller.getAll)
  .get("/:id", verifyJwt, controller.getOne)
  .post("/", controller.createOne)
  .delete("/:id", verifyJwt, controller.deleteOne);

export default router;
