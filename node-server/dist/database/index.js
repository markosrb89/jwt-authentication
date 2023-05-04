import { Sequelize } from "sequelize";
const dbConfig = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: "postgres",
});
export default dbConfig;
//# sourceMappingURL=index.js.map