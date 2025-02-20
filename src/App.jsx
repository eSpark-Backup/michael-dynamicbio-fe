import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth-layout";
import PrivateLayout from "./layout/private-layout";

import {
  Login,
  Signup,
  GoogleAuth,
  OtpVerified,
  FindEmail,
  SelectEmail,
  VerifyEmail,
  ForgetPassword,
  ResetSuccess,
  CompleteProfile,
  UploadImage,
  TroubleshootMfa,
  EmailMfa,
  ResyncMfa,
  Home,
  Bonds,
  Cells,
  Pulses,
} from "./pages";
import "./app.css";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/google-auth" element={<GoogleAuth />} />
        <Route path="/otp-verified" element={<OtpVerified />} />
        {/* Forget password */}
        <Route path="/find-email" element={<FindEmail />} />
        <Route path="/select-email" element={<SelectEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        {/* Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/upload-image" element={<UploadImage />} />
        {/* Trouble shoot MFA */}
        <Route path="/troubleshoot-mfa" element={<TroubleshootMfa />} />
        <Route path="/email-mfa" element={<EmailMfa />} />
        <Route path="/resync-mfa" element={<ResyncMfa />} />
      </Route>

      <Route element={<PrivateLayout isAuthenticated={true} />}>
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
