import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  Article,
  PageDetailsPage,
  AdminView,
  Profile,
  SavedPosts,
  SinglePost,
  GeneralPage,
  GeneralArticle,
  GeneralEvent,
  GeneralPost,
  Settings,
  UserBonds,
} from "./pages";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticleDetails, EventDetails, GroupDetails, ManageGroup } from "./components";
import SocketListener from "./socket/socket-listener";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "./utils";
import { handleChange } from "./store/slices/search";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useQuery();
  const q = query.get("q");
  const filter = query.get("filter");
  useEffect(() => {
    dispatch(handleChange(q));
  }, []);
  const { search } = useSelector((state) => state.search);
  useEffect(() => {
    if (search !== null) {
      const delaySearch = setTimeout(() => {
        if (search === "") {
          navigate("/bonds?sub=bond");
        } else {
          navigate(`/bonds?q=${search}&filter=${filter || "all"}`);
        }
      }, 500);

      return () => clearTimeout(delaySearch);
    }
  }, [search, filter]);

  useEffect(() => {
    if (pathname !== "/bonds") {
      dispatch(handleChange(null));
    }
  }, [pathname]);
  return (
    <>
      <SocketListener />
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
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/add-mobile" element={<AddMobile />} />
          <Route path="/verify-mobile" element={<NumberOtp />} />
          {/* Signup */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/upload-image" element={<UploadImage />} />
          {/* Trouble shoot MFA */}
          <Route path="/troubleshoot-mfa" element={<TroubleshootMfa />} />
          <Route path="/email-mfa" element={<EmailMfa />} />
          <Route path="/resync-mfa" element={<ResyncMfa />} />
        </Route>
        <Route path="/:type/:name/share" element={<GeneralPage />} />
        <Route path="/general/article" element={<GeneralArticle />} />
        <Route path="/general/event" element={<GeneralEvent />} />
        <Route path="/general/text" element={<GeneralPost />} />
        <Route path="/general/image" element={<GeneralPost />} />
        <Route path="/general/video" element={<GeneralPost />} />
        <Route path="/general/poll" element={<GeneralPost />} />
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/cells" element={<Cells />} />
          <Route path="/pulses" element={<Pulses />} />
          <Route path="/article" element={<Article />} />
          <Route path="/article/edit/:id" element={<Article />} />
          <Route path="/page/:id" element={<PageDetailsPage />} />
          <Route path="/page/:id/admin" element={<AdminView />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="/group/:id" element={<GroupDetails />} />
          <Route path="/group/:id/manage" element={<ManageGroup />} />
          <Route path="/save-posts" element={<SavedPosts />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/bonds/:id" element={<UserBonds />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
