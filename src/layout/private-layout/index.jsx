import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const PrivateLayout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
