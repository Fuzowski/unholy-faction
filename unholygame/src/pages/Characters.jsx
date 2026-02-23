import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CharacterContext } from "../context/CharacterContext";

function Characters() {
  const { user } = useContext(AuthContext);
  const { getCharactersByOwner, addXp, xpToNextLevel } =
    useContext(CharacterContext);

  const myChars = getCharactersByOwner(user.id);

  return (
    <div
      style={{
        padding: "2rem",
        background: "#111",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>Your Characters</h1>

      <div style={{ margin: "12px 0" }}>
        <Link to="/characters/new" style={{ color: "crimson" }}>
          + Create a character
        </Link>
      </div>

      {myChars.length === 0 ? (
        <p>No characters yet. Create your first one.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px", maxWidth: 560 }}>
          {myChars.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#1c1c1c",
                padding: "16px",
                borderRadius: 8,
              }}
            >
              <h2 style={{ margin: 0 }}>{c.name}</h2>
              <p style={{ opacity: 0.9 }}>{c.bio || "(No bio yet)"}</p>

              <p style={{ marginTop: 8 }}>
                <strong>Level:</strong> {c.level}{" "}
                <span style={{ opacity: 0.8 }}>
                  (XP: {c.xp}/{xpToNextLevel(c.level)})
                </span>
              </p>

              <button
                onClick={() => addXp(c.id, 25)}
                style={{
                  padding: "8px 12px",
                  background: "crimson",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                +25 XP
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Characters;