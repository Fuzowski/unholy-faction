import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup() {
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const result = signup(email, password);

        if (result.sucess) {
            navigaate("/dashboard");
        } else {
            setError(result.message || "Signup failed");
        }
    }

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Password</label>
                    <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.taarget.value)}
                     required
                     />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;