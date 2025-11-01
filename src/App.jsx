import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import AddContactModal from "./components/AddContactModal";
import ContactCard from "./components/ContactCard";
import ContactPreview from "./components/ContactPreview";
import {
  loadContacts,
  saveContacts,
  loadTheme,
  saveTheme,
} from "./utils/storage";
import { mergeDuplicates } from "./utils/mergeContacts";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [contacts, setContacts] = useState(() => loadContacts());
  const [theme, setTheme] = useState(() => loadTheme()); // "dark" or "light"
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [collapsed, setCollapsed] = useState({}); // letter -> bool

  // persist contacts & theme
  useEffect(() => saveContacts(contacts), [contacts]);

  useEffect(() => {
    // save via utility and set a single class on <html>
    saveTheme(theme);
    // remove both just to be safe, then add chosen
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme === "light" ? "light" : "dark");
  }, [theme]);

  // search/filter/sort
  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return contacts
      .filter((c) => (favoritesOnly ? c.favourite : true))
      .filter((c) => {
        if (!q) return true;
        const fullname = `${c.firstName} ${c.middleName || ""} ${
          c.lastName || ""
        }`.toLowerCase();
        const phones = (c.phoneNumbers || []).join(" ").toLowerCase();
        return (
          fullname.includes(q) ||
          phones.includes(q) ||
          (c.email || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const na = `${a.firstName} ${a.lastName}`.trim().toLowerCase();
        const nb = `${b.firstName} ${b.lastName}`.trim().toLowerCase();
        return na.localeCompare(nb);
      });
  }, [contacts, query, favoritesOnly]);

  // grouped by first letter
  const grouped = useMemo(() => {
    const g = {};
    for (const c of filtered) {
      const letter = (c.firstName?.[0] || "#").toUpperCase();
      if (!g[letter]) g[letter] = [];
      g[letter].push(c);
    }
    return g;
  }, [filtered]);

  // add or update
  const upsertContact = (payload) => {
    setContacts((prev) => {
      if (!payload.id) payload.id = Date.now();
      const idx = prev.findIndex((p) => p.id === payload.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = payload;
        return copy;
      } else {
        return [payload, ...prev];
      }
    });
    setShowAdd(false);
    setEditing(null);
  };

  const removeContact = (id) =>
    setContacts((prev) => prev.filter((p) => p.id !== id));

  const toggleFav = (id) =>
    setContacts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, favourite: !p.favourite } : p
      )
    );

  // --- NEW: Function to remove photo ---
  const removePhoto = (id) => {
    setContacts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, photo: "" } : p // Set photo to empty string
      )
    );
    // Also update the preview state so the modal updates live
    setPreview((prev) =>
      prev && prev.id === id ? { ...prev, photo: "" } : prev
    );
  };

  const handleMerge = (contact) => {
    const merged = mergeDuplicates(contacts);
    setContacts(merged);
    alert("Duplicates merged.");
    setPreview(null);
  };

  const toggleSection = (letter) =>
    setCollapsed((p) => ({ ...p, [letter]: !p[letter] }));

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Header
          query={query}
          setQuery={setQuery}
          total={filtered.length}
          onAdd={() => {
            setEditing(null);
            setShowAdd(true);
          }}
          favoritesOnly={favoritesOnly}
          setFavoritesOnly={setFavoritesOnly}
          theme={theme}
          setTheme={setTheme}
          view={view}
          setView={setView}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <div
            className={`text-sm transition-colors duration-300 ${
              theme === "light" ? "text-[#4c1d95]" : "text-[#c4b5fd]"
            }`}
          >
            Total Contacts: <b>{filtered.length}</b>
          </div>
          <div />
        </div>

        <div className="mt-6">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center text-white/80 py-20">
              No contacts yet — click + Add
            </div>
          ) : (
            Object.keys(grouped)
              .sort()
              .map((letter) => (
                <div key={letter} className="mb-6">
                  <button
                    onClick={() => toggleSection(letter)}
                    className="group-header w-full flex items-center justify-between mb-3"
                  >
                    <span>{letter}</span>
                    <span className="text-sm opacity-70">
                      {collapsed[letter] ? "▶" : "▼"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {!collapsed[letter] && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`grid gap-6 ${
                          view === "grid"
                            ? "sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                        }`}
                      >
                        {grouped[letter].map((c) => (
                          <ContactCard
                            key={c.id}
                            contact={c}
                            onOpen={() => setPreview(c)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Add/Edit modal */}
      <AnimatePresence>
        {(showAdd || editing) && (
          <AddContactModal
            contact={editing}
            onClose={() => {
              setShowAdd(false);
              setEditing(null);
            }}
            onSave={(c) => upsertContact(c)}
          />
        )}
      </AnAtePresence>

      {/* Preview */}
      <AnimatePresence>
        {preview && (
          <ContactPreview
            contact={preview}
            onClose={() => setPreview(null)}
            onEdit={() => {
              setEditing(preview);
              setShowAdd(true);
              setPreview(null);
            }}
            onDelete={() => {
              removeContact(preview.id);
              setPreview(null);
            }}
            onMerge={() => handleMerge(preview)}
            onFavourite={() => {
              toggleFav(preview.id);
              setPreview((p) => ({ ...p, favourite: !p.favourite })); // Update preview live
            }}
            theme={theme}
            
            {/* --- PASS THE NEW FUNCTION --- */}
            onRemovePhoto={() => {
              removePhoto(preview.id);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
