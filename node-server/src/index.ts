import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import dbConfig from "./database/index.js";
import { errorHandler } from "./middlewares.js";
import "./models/users.js";

import userApi from "./routes/users.js";
import healthCheckerApi from "./routes/health-checker.js";
import authApi from "./routes/auth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(helmet());

app.use("/api/v1/users", userApi);
app.use("/api/v1/auth", authApi);
// Testing
app.use("/health-checker", healthCheckerApi);

// Unknown routes
app.all(
  "*",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
  }
);

app.use(errorHandler);

(async () => {
  try {
    await dbConfig.sync(
      { force: false } // Reset db every time
    );
    app.listen(process.env.EXTERNAL_PORT, () =>
      console.log(`Server is running on port: ${process.env.EXTERNAL_PORT}`)
    ); // DEF in docker.compose.yml
  } catch (error) {
    console.log(error);
  }
})();
