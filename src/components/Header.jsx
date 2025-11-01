import React from "react";
import { Plus, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ViewSwitcher from "./ViewSwitcher";

export default function Header({
  query,
  setQuery,
  total,
  onAdd,
  favoritesOnly,
  setFavoritesOnly,
  theme,
  setTheme,
  view,
  setView,
}) {
  const headerBg =
    theme === "light"
      ? "bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 shadow-none"
      : "bg-transparent";

  return (
    <header
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 rounded-2xl transition-all duration-300 ${headerBg}`}
    >
      {/* 🔹 Title + Search + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
        {/* Title Section */}
        <div className="flex flex-col sm:mr-4">
          <h1
            className={`text-2xl font-bold ${
              theme === "light" ? "text-purple-700" : "text-white"
            }`}
          >
            Contacts
          </h1>
          <p
            className={`text-sm ${
              theme === "light" ? "text-purple-500" : "text-gray-400"
            }`}
          >
            Manage your contacts
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all ${
              theme === "light"
                ? "bg-white/60 placeholder:text-purple-400 text-purple-900 shadow-sm"
                : "bg-white/10 placeholder:text-gray-400 text-white"
            }`}
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-xl text-white flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* ⭐ Filters + Toggles */}
      <div className="flex items-center justify-between sm:justify-end gap-3">
        <button
          onClick={() => setFavoritesOnly((prev) => !prev)}
          className={`px-3 py-2 rounded-lg transition font-medium flex items-center gap-1 ${
            theme === "light"
              ? favoritesOnly
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          }`}
        >
          <span
            className={`transition-colors ${
              favoritesOnly ? "text-yellow-400" : "text-white"
            }`}
          >
            ★
          </span>
          Favourites
        </button>

        <ThemeToggle theme={theme} setTheme={setTheme} />
        <ViewSwitcher view={view} setView={setView} />

        <div
          className={`text-xs font-medium ${
            theme === "light" ? "text-purple-600" : "text-white/70"
          }`}
        >
          Total: <b>{total}</b>
        </div>
      </div>
    </header>
  );
}
