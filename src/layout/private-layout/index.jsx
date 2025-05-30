import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";
import Header from "./Header";
import Navbar from "./Navbar";
import { useGetUserInfoMutation } from "../../services/auth";
import { logout } from "../../store/slices/auth";
import { api } from "../../services/rtk";


const PrivateLayout = () => {
  const token = localStorage.getItem("token");
  const [getInfo] = useGetUserInfoMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { pathname } = useLocation();

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (token && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      setLoading(true);
      localStorage.removeItem("temp-token");
      getInfo().then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          dispatch(logout());
          dispatch(api.util.resetApiState());
          navigate("/login");
          setLoading(false);
          return;
        }
        if (res?.data) {
          setLoading(false);
        }
      });
    }
  }, [token]);

  if (loading) {
    return (
      <>
        <Header />
        <Box
          sx={{
            width: "100vw",
            height: "calc(100vh - 66px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#1877F2" }} />
        </Box>
      </>
    );
  }

  return (
    <>
      {
        (pathname !== "/settings" && pathname !== "/ddt")
        &&
        <>
          <Header />
          <Navbar />
        </>
      }
      <Outlet />
    </>
  );
};

export default PrivateLayout;
