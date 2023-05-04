import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dbConfig from "./database/index.js";
import { notFound, errorHandler } from "./middlewares.js";
import "./models/users.js";
import userApi from "./routes/users.js";
import healthCheckerApi from "./routes/health-checker.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(helmet());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use("/api/v1/users", userApi);
app.get("/api/v1/health-checker", healthCheckerApi);
app.use(notFound);
app.use(errorHandler);
(async () => {
    try {
        await dbConfig.sync({ force: false } // Reset db every time
        );
        app.listen(process.env.EXTERNAL_PORT, () => console.log(`Server is running on port: ${process.env.EXTERNAL_PORT}`)); // DEF in docker.compose.yml
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=index.js.map