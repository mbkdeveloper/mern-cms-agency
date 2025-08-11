// src/components/common/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StoreContext } from "../store/StoreContext";

const PrivateRoute = () => {
  const { token } = useContext(StoreContext);

  // If no token → redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
