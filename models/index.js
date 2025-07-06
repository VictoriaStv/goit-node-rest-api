import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
