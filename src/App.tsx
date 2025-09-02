import Footer from "./core/components/Footer";
import { AuthProvider } from "./core/state/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./core/components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-base-100 flex flex-col">
          <Navbar cartItemCount={4} />
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
          <div className="divider divide-x-2"></div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
