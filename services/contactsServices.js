import { Contact } from "../models/index.js";

export const listContacts = (ownerId) =>
  Contact.findAll({ where: { owner: ownerId } });

export const getContactById = (ownerId, contactId) =>
  Contact.findOne({ where: { id: contactId, owner: ownerId } });

export const addContact = (ownerId, data) =>
  Contact.create({ ...data, owner: ownerId });

export const removeContact = async (ownerId, contactId) => {
  const contact = await getContactById(ownerId, contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContact = async (ownerId, contactId, data) => {
  const contact = await getContactById(ownerId, contactId);
  if (!contact) return null;
  return contact.update(data);
};

export const updateStatusContact = async (ownerId, contactId, { favorite }) => {
  const contact = await getContactById(ownerId, contactId);
  if (!contact) return null;
  return contact.update({ favorite });
};
