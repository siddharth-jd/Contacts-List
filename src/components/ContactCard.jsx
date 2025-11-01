import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactCard({ contact, onOpen }) {
  const [showFull, setShowFull] = useState(false);

  const first = contact.firstName || "";
  const middle = contact.middleName || "";
  const last = contact.lastName || "";
  const initial = (first[0] || "?").toUpperCase();

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
      className="contact-card p-4 rounded-2xl backdrop-blur-md shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        {contact.photo ? (
          <img
            src={contact.photo}
            alt={first}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-bold">
            {initial}
          </div>
        )}

        <div className="flex-1" onClick={() => onOpen(contact)}>
          {!showFull ? (
            <div className="text-lg font-semibold">{first}</div>
          ) : (
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{first}</div>
              {middle ? <div className="text-sm opacity-90">{middle}</div> : null}
              {last ? <div className="text-sm opacity-90">{last}</div> : null}
            </div>
          )}

          <div className="text-sm opacity-90 mt-1">
            {(contact.phoneNumbers || []).slice(0, 2).join(", ")}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFull(s => !s);
            }}
            className="px-2 py-1 bg-white/10 rounded-md text-sm"
            title={showFull ? "Hide full name" : "Show full name"}
          >
            {showFull ? "▲" : "▼"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}