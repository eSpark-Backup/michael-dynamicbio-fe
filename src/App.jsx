import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth-layout";
import PrivateLayout from "./layout/private-layout";

import { Login, Signup, GoogleAuth, OtpVerified, Home, Bonds, Cells, Pulses } from "./pages";
import "./app.css"

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/google-auth" element={<GoogleAuth />} />
        <Route path="/otp-verified" element={<OtpVerified />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateLayout isAuthenticated={false} />}>
        <Route path="/" element={<Home />} />
        <Route path="/bonds" element={<Bonds />} />
        <Route path="/cells" element={<Cells />} />
        <Route path="/pulses" element={<Pulses />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
