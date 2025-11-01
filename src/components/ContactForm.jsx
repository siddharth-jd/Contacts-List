import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm({ contact, onSave, onCancel }) {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumbers: [""],
    email: "",
    photo: "",
    favourite: false,
    id: null,
  });

  useEffect(() => {
    if (contact) {
      setForm({
        firstName: contact.firstName || "",
        middleName: contact.middleName || "",
        lastName: contact.lastName || "",
        phoneNumbers: contact.phoneNumbers?.length ? [...contact.phoneNumbers] : [""],
        email: contact.email || "",
        photo: contact.photo || "",
        favourite: !!contact.favourite,
        id: contact.id,
      });
    }
  }, [contact]);

  const change = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const changePhone = (i, v) => setForm(s => ({ ...s, phoneNumbers: s.phoneNumbers.map((p, idx) => idx === i ? v : p) }));
  const addPhone = () => setForm(s => ({ ...s, phoneNumbers: [...s.phoneNumbers, ""] }));
  const removePhone = (i) => setForm(s => ({ ...s, phoneNumbers: s.phoneNumbers.filter((_, idx) => idx !== i) }));

  const handleImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setForm(s => ({ ...s, photo: r.result }));
    r.readAsDataURL(f);
  };

  const submit = (e) => {
    e.preventDefault();
    const numbers = Array.from(new Set(form.phoneNumbers.map(n => n.trim()).filter(Boolean)));
    if (!form.firstName || numbers.length === 0) return alert("Provide first name and at least one number.");
    onSave({ ...form, phoneNumbers: numbers, id: form.id ?? Date.now() });
  };

  return (
    <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form onSubmit={submit} className="bg-white/10 text-white p-6 rounded-3xl w-full max-w-lg" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
        <h2 className="text-2xl font-bold mb-4">{contact ? "Edit Contact" : "Add Contact"}</h2>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <input placeholder="First" value={form.firstName} onChange={(e) => change("firstName", e.target.value)} className="px-3 py-2 rounded-lg bg-white/20 text-white" />
          <input placeholder="Middle" value={form.middleName} onChange={(e) => change("middleName", e.target.value)} className="px-3 py-2 rounded-lg bg-white/20 text-white" />
          <input placeholder="Last" value={form.lastName} onChange={(e) => change("lastName", e.target.value)} className="px-3 py-2 rounded-lg bg-white/20 text-white" />
        </div>

        {form.phoneNumbers.map((p, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <input value={p} onChange={(e) => changePhone(i, e.target.value)} placeholder={`Phone ${i + 1}`} className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white" />
            {form.phoneNumbers.length > 1 && <button type="button" onClick={() => removePhone(i)} className="px-3 py-1 bg-white/10 rounded">✕</button>}
          </div>
        ))}

        <div className="flex gap-2 items-center mb-3">
          <button type="button" onClick={addPhone} className="px-3 py-1 bg-white/10 rounded">➕ Add number</button>
          <label className="px-3 py-2 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 cursor-pointer">
            Choose photo
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>
          {form.photo && <img src={form.photo} alt="preview" className="w-10 h-10 rounded-full" />}
        </div>

        <input value={form.email} onChange={(e) => change("email", e.target.value)} placeholder="Email (optional)" className="w-full px-3 py-2 rounded-lg bg-white/20 text-white mb-4" />

        <div className="flex justify-between">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400">Save</button>
        </div>
      </motion.form>
    </motion.div>
  );
}