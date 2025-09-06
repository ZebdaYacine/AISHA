import Footer from "./core/components/Footer";
import { AuthProvider } from "./core/state/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./feature/RegisterPage";
import LoginPage from "./feature/LoginPage";
import HomePage from "./feature/HomePage";
import Navbar from "./core/components/navbar/Navbar";
import ProfilePage from "./feature/profile/view/pages/ProfilePage";
import { ProfileProvider } from "./core/state/profileContext";
import { CraftsProvider } from "./core/state/craftsContext";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <CraftsProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-base-100 flex flex-col">
              <Navbar cartItemCount={4} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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
