import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Connections from "./components/Connections";
import ConnectionRequest from "./components/ConnectionRequest";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import NotFound from "./components/NotFound"; // Import the NotFound component
import Navbar from "./components/Navbar"; // Import Navbar to be visible always

function App() {
  const user = useSelector((state) => state.user);
  const login = window.localStorage.getItem("isLoggedIn");

  return (
    <>
      <BrowserRouter basename="/">
        {/* Always render the Navbar */}
        <Navbar />

        <Routes>
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />

          {/* Redirect to /feed if logged in, else show login page */}
          <Route
            path="/"
            element={login ? <Navigate to="/feed" /> : <Login />}
          />

          {/* Body component renders for protected routes */}
          <Route path="/" element={<Body />}>
            {/* Protected Routes */}
            {login && (
              <>
                <Route path="/requests" element={<ConnectionRequest />} />
                <Route
                  path="/feed"
                  element={<ProtectedRoute element={<Feed />} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<Profile />} />}
                />
                <Route
                  path="/connections"
                  element={<ProtectedRoute element={<Connections />} />}
                />
              </>
            )}

            {/* Unprotected Routes */}
            <Route path="/forget-password" element={<ForgotPassword />} />
          </Route>

          {/* Catch-all route for unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer component rendered globally */}
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
