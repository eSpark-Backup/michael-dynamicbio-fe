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
  EmailVerified,
  AddMobile,
  NumberOtp,
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
import "./App.css";
import { useGetUserInfoMutation } from "./services/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const App = () => {
  const token = localStorage.getItem("token");
  const [getInfo, { isLoading }] = useGetUserInfoMutation();

  useEffect(() => {
    if (token) {
      getInfo().then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
    }
  }, [token]);
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/google-auth" element={<GoogleAuth />} />
        <Route path="/otp-verified" element={<OtpVerified />} />
        <Route path="/find-email" element={<FindEmail />} />
        <Route path="/select-email" element={<SelectEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/add-mobile" element={<AddMobile />} />
        <Route path="/verify-mobile" element={<NumberOtp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/troubleshoot-mfa" element={<TroubleshootMfa />} />
        <Route path="/email-mfa" element={<EmailMfa />} />
        <Route path="/resync-mfa" element={<ResyncMfa />} />
      </Route>

      <Route element={<PrivateLayout />}>
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
