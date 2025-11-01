import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare, Edit2, Trash2, Merge, Star } from "lucide-react";

export default function ContactPreview({ contact, onClose, onEdit, onDelete, onMerge, onFavourite, onRemovePhoto, theme }) {
  if (!contact) return null;

  const [showLargePhoto, setShowLargePhoto] = useState(false);

  const fullname = [contact.firstName, contact.middleName, contact.lastName].filter(Boolean).join(" ");
  const isLight = theme === "light";

  const cardGradient = isLight
    ? "from-purple-300 via-indigo-300 to-pink-300"
    : "from-indigo-700 via-purple-700 to-pink-700";

  const baseText = isLight ? "text-gray-900" : "text-white";

  const buttonStyles = {
    call: isLight ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-500 text-white",
    msg: isLight ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-500 hover:bg-blue-400 text-white",
    edit: isLight ? "bg-purple-400 hover:bg-purple-500 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black",
    merge: isLight ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-purple-500 hover:bg-purple-400 text-white",
    fav: contact.favourite
      ? isLight
        ? "bg-yellow-500 hover:bg-yellow-400 text-white"
        : "bg-yellow-500 hover:bg-yellow-400 text-black"
      : isLight
        ? "bg-gray-300 hover:bg-yellow-400 text-black"
        : "bg-yellow-700 hover:bg-yellow-500 text-white",
    delete: isLight ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-600 hover:bg-red-500 text-white",
  };

  const firstInitial = (contact.firstName?.[0] || "?").toUpperCase();

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* This is the contact card modal */}
      <motion.div
        className={`bg-gradient-to-br ${cardGradient} ${baseText} p-8 rounded-3xl shadow-2xl max-w-sm w-full transition-all duration-300`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: "spring", duration: 0.45 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{fullname}</h2>
          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {/* Photo/Avatar Display Section */}
        <div className="relative flex justify-center mb-6">
          <motion.div
            layoutId={`contact-photo-${contact.id}`}
            onClick={() => contact.photo && setShowLargePhoto(true)}
            className={contact.photo ? "cursor-pointer" : ""}
            whileTap={contact.photo ? { scale: 0.95 } : {}}
          >
            {contact.photo ? (
              <img src={contact.photo} alt={fullname} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-lg">
                {firstInitial}
              </div>
            )}
          </motion.div>

          {/* --- NEW: Remove Photo Button --- */}
          {contact.photo && (
            <button
              onClick={onRemovePhoto}
              className={`absolute -bottom-2 -right-8 p-2 rounded-full z-10 ${buttonStyles.delete}`}
              title="Remove photo"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Phone Numbers */}
        <div className="mb-4 space-y-2">
          {(contact.phoneNumbers || []).map((p, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="text-lg flex items-center gap-2">
                <Phone size={18} /> {p}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`tel:${p}`)}
                  className={`px-3 py-1 rounded ${buttonStyles.call}`}
                >
                  Call
                </button>
                <button
                  onClick={() => window.open(`sms:${p}`)}
                  className={`px-3 py-1 rounded ${buttonStyles.msg}`}
                >
                  Msg
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Email */}
        {contact.email && (
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare size={18} /> {contact.email}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button onClick={() => onEdit()} className={`py-2 rounded-xl flex items-center justify-center gap-2 ${buttonStyles.edit}`}>
            <Edit2 size={16} /> Edit
          </button>
          <button onClick={() => onMerge()} className={`py-2 rounded-xl flex items-center justify-center gap-2 ${buttonStyles.merge}`}>
            <Merge size={16} /> Merge
          </button>
          <button onClick={() => onFavourite()} className={`py-2 rounded-xl flex items-center justify-center gap-2 ${buttonStyles.fav}`}>
            <Star size={16} /> {contact.favourite ? "Unfav" : "Fav"}
          </button>
          <button onClick={() => onDelete()} className={`py-2 rounded-xl flex items-center justify-center gap-2 ${buttonStyles.delete}`}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </motion.div>

      {/* Large Photo Viewer Modal */}
      <AnimatePresence>
        {showLargePhoto && contact.photo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setShowLargePhoto(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`contact-photo-${contact.id}`}
              className="relative bg-white/10 p-4 rounded-2xl shadow-2xl flex items-center justify-center max-w-lg max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLargePhoto(false)}
                className="absolute top-3 right-3 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 z-10"
              >
                <X size={24} />
              </button>

              <img src={contact.photo} alt={fullname} className="max-w-full max-h-full object-contain rounded-lg" />

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}