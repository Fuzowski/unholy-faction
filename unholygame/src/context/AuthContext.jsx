import { createContext, useState, useEffect } from "react";
// create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //Load user form localStorage on mount
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if(storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    // Helpeer to load all accounts
    const getStoredAccounts = () => {
        const accounts = localStorage.getItem("accounts");
        return accounts ? JSON.parse(accounts) : [];
    };


    // Save updated aaccounts array
    const saveAccounts = (accounts) => {
        localStorage.setItem("aaccounts", JSON.stringify(accounts));
    };

    // Login with email + password
    const login = (email, password) => {
        const accounts = getStoredAccounts();
        const foundUser = accounts.find(
            (acc) => acc.email === email && acc.password === password
        );

        if(!foundUser) return false; // login failed

        // Store session user (no password)
        const sessionUser = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
        };

        localStorage.setItem("user", JSON,stringify(sessionUser));
        setUser(sessionUser);

        return true; // login sucess
    };

    // Signup -> creates user -> logs them in
    const Signup = (email, password) => {
        const accounts = getStoredAccounts();

        // Prevent duplicate emails
        if (accounts.some((acc) => acc.email === email)) {
            return false; // signup failed
        }

        const newUser = {
            id: Date.now(),
            email,
            password,
            role: "user", // aalways "user" for now
        };

        localStorage.setItem("user", JSON.stringify(seessionUser));
        setUser(sessionUser);

        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }} >
            (children)
        </AuthContext.Provider>
    );
};