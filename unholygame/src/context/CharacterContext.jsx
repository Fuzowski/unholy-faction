import { createContext, useEffect, useMemo, useState } from "react";

export const CharacterContext = createContext(null);

export function CharacterProvider({ children }) {
  const [characters, setCharacters] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("characters");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setCharacters(parsed);
    } catch (err) {
      console.error("Failed to parse characters:", err);
      localStorage.removeItem("characters");
    }
  }, []);

  // Save to localStorage when characters change
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const createCharacter = (ownerId, { name, bio }) => {
    if (!name?.trim()) {
      return { success: false, message: "Name is required." };
    }

    const newCharacter = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      ownerId,
      name: name.trim(),
      bio: bio?.trim() || "",
      xp: 0,
      level: 1,
      createdAt: new Date().toISOString(),
    };

    setCharacters((prev) => [newCharacter, ...prev]);
    return { success: true, character: newCharacter };
  };

  const getCharactersByOwner = (ownerId) => {
    return characters.filter((c) => c.ownerId === ownerId);
  };

  // XP + level logic (simple but solid)
  const xpToNextLevel = (level) => level * 100;

  const addXp = (characterId, amount) => {
    const xpAmount = Number(amount);
    if (!Number.isFinite(xpAmount) || xpAmount <= 0) {
      return { success: false, message: "XP amount must be a positive number." };
    }

    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== characterId) return c;

        let xp = c.xp + xpAmount;
        let level = c.level;

        while (xp >= xpToNextLevel(level)) {
          xp -= xpToNextLevel(level);
          level += 1;
        }

        return { ...c, xp, level };
      })
    );

    return { success: true };
  };

  const value = useMemo(
    () => ({
      characters,
      createCharacter,
      getCharactersByOwner,
      addXp,
      xpToNextLevel,
    }),
    [characters]
  );

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}