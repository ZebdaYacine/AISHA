import Footer from "./core/components/Footer";
import { AuthProvider } from "./core/state/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./feature/RegisterPage";
import LoginPage from "./feature/LoginPage";
import HomePage from "./feature/HomePage";
import Navbar from "./core/components/navbar/Navbar";
import ProfilePage from "./feature/profile/view/pages/ProfilePage";
import StorePage from "./feature/store/view/pages/StorePage";
import { ProfileProvider } from "./core/state/profileContext";
import { CraftsProvider } from "./core/state/craftsContext";
import ThemeToggle from "./core/components/ThemeToggle";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <CraftsProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-base-100 flex flex-col">
              <Navbar cartItemCount={4} />
              {/* Floating Theme Toggle */}
              <div className="hidden md:flex fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-primary text-white z-50">
                <ThemeToggle />
              </div>

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-store" element={<StorePage />} />
              </Routes>
              <div className="divider divide-x-2"></div>
              <Footer />
            </div>
          </BrowserRouter>
        </CraftsProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
