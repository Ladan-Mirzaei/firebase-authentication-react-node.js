import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
