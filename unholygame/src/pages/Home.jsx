import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Home Page</h1>

      <p>Welcome to Unholy Faction</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;