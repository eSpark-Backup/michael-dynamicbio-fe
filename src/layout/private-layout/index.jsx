import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const PrivateLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
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
