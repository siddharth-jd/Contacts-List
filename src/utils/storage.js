// src/utils/storage.js
const KEY = "tria_contacts_v1";
const THEME = "tria_theme_v1";

export function loadContacts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveContacts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME) || "dark";
  } catch {
    return "dark";
  }
}

export function saveTheme(v) {
  try {
    localStorage.setItem(THEME, v);
  } catch {}
}
