import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Body from "./Body"
import Profile from "./components/Profile"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./pages/feed"
import NotFound from "./pages/NotFound"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyProfile from "./pages/VerifyProfile"
import VerifyOtp from "./pages/VerifyOtp"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import About from "./pages/About"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Contact from "./pages/Contact"


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Toaster />
          <Routes>

            <Route path="/" element={<Body />}>
              <Route path="/" element={<ProtectedRoute>
                <Feed />
              </ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              <Route path="/profile" element={<ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />

              <Route path="/verify-profile" element={<ProtectedRoute><VerifyProfile/></ProtectedRoute>}/>
              <Route path="/verify-otp" element={<ProtectedRoute><VerifyOtp/></ProtectedRoute>}/>
              <Route path="/connections" element={<ProtectedRoute><Connections/></ProtectedRoute>}/>
              <Route path="/requests" element={<ProtectedRoute><Requests/></ProtectedRoute>}/>

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
