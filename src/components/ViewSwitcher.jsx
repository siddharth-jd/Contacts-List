import React from "react";
import { LayoutGrid, List } from "lucide-react";

export default function ViewSwitcher({ view, setView }) {
  return (
    <div className="view-switcher">
      <button
        onClick={() => setView("grid")}
        className={view === "grid" ? "active" : ""}
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => setView("list")}
        className={view === "list" ? "active" : ""}
      >
        <List size={18} />
      </button>
    </div>
  );
}