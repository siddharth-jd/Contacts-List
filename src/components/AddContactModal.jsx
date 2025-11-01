import React from "react";
import ContactForm from "./ContactForm";

export default function AddContactModal({ contact, onClose, onSave }) {
  return (
    <ContactForm contact={contact} onSave={(c) => { onSave(c); onClose(); }} onCancel={onClose} />
  );
}