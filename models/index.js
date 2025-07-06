import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

import defineUser from "./user.model.js";
import defineContact from "./contact.model.js";

export const User = defineUser(sequelize, DataTypes);
export const Contact = defineContact(sequelize, DataTypes);

User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });

export const initDb = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database connection successful");
    await sequelize.sync();
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};
