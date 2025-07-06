import { Contact } from "../models/contact.model.js";

export const listContacts = () => {
  return Contact.findAll();
};

export const getContactById = (id) => {
  return Contact.findByPk(id);
};

export const addContact = (data) => {
  return Contact.create(data);
};

export const removeContact = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContact = async (id, data) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  return contact.update(data);
};

export const updateStatusContact = async (id, { favorite }) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  return contact.update({ favorite });
};
