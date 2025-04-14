import { Outlet ,Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
  };

export default ProtectedRoute;
