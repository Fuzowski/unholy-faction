import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Not logged in → go to login, preserve intended destination
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin → send to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
