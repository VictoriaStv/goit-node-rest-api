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

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.delete("/:id", deleteContact);

router.post("/", validateBody(createContactSchema), createContact);
router.put("/:id", validateBody(updateContactSchema), updateContact);
router.patch("/:id/favorite", validateBody(favoriteSchema), updateFavorite);

export default router;
