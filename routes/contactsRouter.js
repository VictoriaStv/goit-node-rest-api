import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
} from "../schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { auth } from "../helpers/authMiddleware.js";

const router = express.Router();
router.use(auth);
router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", validateBody(createContactSchema), createContact);
router.put("/:id", validateBody(updateContactSchema), updateContact);
router.patch("/:id/favorite", validateBody(favoriteSchema), updateFavorite);
router.delete("/:id", deleteContact);
export default router;
