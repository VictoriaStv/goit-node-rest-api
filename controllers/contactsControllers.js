import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact as updateServiceContact,
  updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

// GET  /api/contacts
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

// GET  /api/contacts/:id
export const getOneContact = async (req, res, next) => {
  try {
    const id = req.params.id.trim();
    const contact = await getContactById(id);
    if (!contact) throw HttpError(404, "Not found");
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/contacts/:id
export const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id.trim();
    const deleted = await removeContact(id);
    if (!deleted) throw HttpError(404, "Not found");
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};

// POST   /api/contacts
export const createContact = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

// PUT    /api/contacts/:id
export const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id.trim();
    const updated = await updateServiceContact(id, req.body);
    if (!updated) throw HttpError(404, "Not found");
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// PATCH  /api/contacts/:id/favorite
export const updateFavorite = async (req, res, next) => {
  try {
    const id = req.params.id.trim();
    const { favorite } = req.body;
    if (favorite === undefined) {
      throw HttpError(400, `"favorite" is required`);
    }
    const updated = await updateStatusContact(id, { favorite });
    if (!updated) throw HttpError(404, "Not found");
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
