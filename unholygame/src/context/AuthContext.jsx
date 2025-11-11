import { createContext, useState, useEffect } from "react";

// Create the Context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localSotorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    
    // Mock Login function
    const login = (username, role = "user") => {
        const mockUser = { id: 1, useername, role};
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
    };

    // Mock Logout Function
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    // Mock Signup Function
    const signup = (username, role = "user") => {
        login(username,role);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, signup}}>
            {children}
        </AuthContext.Provider>
    );
};