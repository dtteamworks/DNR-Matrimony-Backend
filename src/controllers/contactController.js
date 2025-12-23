import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';


const createContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  const contact = await Contact.create({
    fullName,
    email,
    phone,
    message
  });

  res.status(201).json({
    success: true,
    data: contact
  });
});


const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts
  });
});


const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  res.status(200).json({
    success: true,
    data: contact
  });
});


const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Contact deleted successfully'
  });
});

export { createContact, getAllContacts, getContactById, deleteContact };