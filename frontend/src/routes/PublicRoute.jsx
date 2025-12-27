import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    if (user.role === "admin" || user.role === "sub-admin") {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === "labor") {
      return <Navigate to="/labor" replace />;
    }
  }

  return children;
};

export default PublicRoute;
