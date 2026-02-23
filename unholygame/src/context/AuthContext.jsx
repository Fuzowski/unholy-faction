import { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load session user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsed = JSON.parse(storedUser);

      // Basic shape validation (prevents crashes if storage is tampered/corrupted)
      if (parsed?.id && parsed?.email && parsed?.role) {
        setUser(parsed);
      } else {
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("user");
    }
  }, []);

  // Helpers: accounts storage
  const getStoredAccounts = () => {
    try {
      const accounts = localStorage.getItem("accounts");
      return accounts ? JSON.parse(accounts) : [];
    } catch (err) {
      console.error("Failed to parse accounts:", err);
      localStorage.removeItem("accounts");
      return [];
    }
  };

  const saveAccounts = (accounts) => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  // Login with email + password
  const login = (email, password) => {
    const accounts = getStoredAccounts();

    const foundUser = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password." };
    }

    const sessionUser = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };

    localStorage.setItem("user", JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  };

  // Signup -> create user -> auto-login
  const signup = (email, password) => {
    const accounts = getStoredAccounts();

    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    // Prevent duplicate emails
    if (accounts.some((acc) => acc.email === email)) {
      return { success: false, message: "That email is already registered." };
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      role: "user", // default role
    };

    const updatedAccounts = [...accounts, newUser];
    saveAccounts(updatedAccounts);

    const sessionUser = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    localStorage.setItem("user", JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};