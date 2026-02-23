import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>
          Unholy Faction
        </Link>
      </div>

      <div style={styles.right}>
        {!user && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>

            <Link to="/characters" style={styles.link}>
              Characters
            </Link>

            <Link to="/map" style={styles.link}>
              Map
            </Link>

            {user.role === "admin" && (
              <Link to="/admin" style={styles.link}>
                Admin
              </Link>
            )}

            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#111",
    color: "white",
  },
  left: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  right: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logo: {
    color: "crimson",
    textDecoration: "none",
  },
  logout: {
    background: "crimson",
    border: "none",
    padding: "6px 12px",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;