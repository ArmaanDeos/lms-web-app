import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ authenticate, user, element }) => {
  const location = useLocation();

  if (!authenticate && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticate &&
    user?.role !== "admin" &&
    (location.pathname.includes("/admin") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticate &&
    user?.role === "admin" &&
    !location.pathname.includes("/admin")
  ) {
    return <Navigate to="/admin" />;
  }

  return <Fragment>{element}</Fragment>;
};

export default ProtectedRoutes;
