// src/utils/mergeContacts.js
// Merge contacts by phone or exact (first+last) name; produce deduped list preserving phoneNumbers
export function mergeDuplicates(contacts = []) {
  const byKey = new Map();
  const normalize = (s) => (s || "").toString().replace(/\s+/g, "").toLowerCase();

  // helper: ensure phoneNumbers is array and trimmed
  const ensure = (c) => {
    const phones = new Set();
    if (Array.isArray(c.phoneNumbers)) c.phoneNumbers.forEach((p) => phones.add((p || "").toString().trim()));
    if (c.phone) phones.add((c.phone || "").toString().trim());
    return { ...c, phoneNumbers: Array.from(phones).filter(Boolean) };
  };

  for (const raw of contacts) {
    const c = ensure(raw);
    // prefer phone primary key if exists
    const primary = c.phoneNumbers[0] || "";
    if (primary) {
      const key = `phone:${normalize(primary)}`;
      if (!byKey.has(key)) byKey.set(key, { ...c });
      else {
        const prev = byKey.get(key);
        const mergedNumbers = Array.from(new Set([...(prev.phoneNumbers || []), ...(c.phoneNumbers || [])]));
        byKey.set(key, { ...prev, ...c, phoneNumbers: mergedNumbers });
      }
    } else {
      const nameKey = `name:${normalize(c.firstName)}|${normalize(c.lastName)}`;
      if (!byKey.has(nameKey)) byKey.set(nameKey, { ...c });
      else {
        const prev = byKey.get(nameKey);
        const mergedNumbers = Array.from(new Set([...(prev.phoneNumbers || []), ...(c.phoneNumbers || [])]));
        byKey.set(nameKey, { ...prev, ...c, phoneNumbers: mergedNumbers });
      }
    }
  }

  const result = Array.from(byKey.values()).map((c, i) => ({
    id: c.id ?? Date.now() + i,
    firstName: c.firstName ?? "",
    middleName: c.middleName ?? "",
    lastName: c.lastName ?? "",
    phoneNumbers: Array.isArray(c.phoneNumbers) ? c.phoneNumbers : (c.phone ? [c.phone] : []),
    email: c.email ?? "",
    photo: c.photo ?? "",
    favourite: !!c.favourite,
  }));

  // keep unique by normalized (first+last) if accidental matches across phone/name keys
  const final = [];
  const seen = new Set();
  for (const c of result) {
    const key = `${(c.firstName||"").toLowerCase()}|${(c.lastName||"").toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      final.push(c);
    } else {
      // merge with existing
      const idx = final.findIndex((x) => `${(x.firstName||"").toLowerCase()}|${(x.lastName||"").toLowerCase()}` === key);
      if (idx >= 0) {
        const prev = final[idx];
        final[idx] = {
          ...prev,
          ...c,
          phoneNumbers: Array.from(new Set([...(prev.phoneNumbers||[]), ...(c.phoneNumbers||[])])),
        };
      }
    }
  }

  return final;
}
