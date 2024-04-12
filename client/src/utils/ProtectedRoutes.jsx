import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  let authenticated = false;

  if (token) {
    authenticated = true;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
