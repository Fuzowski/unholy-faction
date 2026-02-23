import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <div style={styles.card}>
        <h2>Session Active ✅</h2>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    color: "white",
  },
  card: {
    background: "#1c1c1c",
    padding: "2rem",
    borderRadius: "8px",
    width: "300px",
    marginTop: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "8px 14px",
    background: "crimson",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Dashboard;