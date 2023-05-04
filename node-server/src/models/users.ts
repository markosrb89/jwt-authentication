import { DataTypes, Model } from "sequelize";
import dbConfig from "../database/index.js";

interface UserAttributes {
  id: string;
  email: string;
  full_name: string;
  password: string;
}

export interface UserInstance
  extends Model<UserAttributes, UserAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = dbConfig.define<UserInstance>("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
