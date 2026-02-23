import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CharacterContext } from "../context/CharacterContext";

function CreateCharacter() {
  const { user } = useContext(AuthContext);
  const { createCharacter } = useContext(CharacterContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = createCharacter(user.id, { name, bio });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/characters");
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "#111",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>Create Character</h1>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          placeholder="Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Character Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Create Character
        </button>
      </form>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    minHeight: "80px",
  },
  button: {
    padding: "10px 14px",
    background: "crimson",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default CreateCharacter;