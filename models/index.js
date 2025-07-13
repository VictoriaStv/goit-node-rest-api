import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./db.js";
import { User } from "./user.model.js";
import { Contact } from "./contact.model.js";

User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
    await sequelize.sync();
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};
