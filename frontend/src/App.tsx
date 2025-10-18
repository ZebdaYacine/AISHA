import Footer from "./core/components/Footer";
import { AuthProvider } from "./core/state/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./feature/RegisterPage";
import LoginPage from "./feature/LoginPage";
import HomePage from "./feature/HomePage";
import Navbar from "./core/components/navbar/Navbar";
import ProfilePage from "./feature/profile/view/pages/ProfilePage";
import ProofOfCraftsmanshipPage from "./feature/profile/view/pages/ProofOfCraftsmanshipPage";
import StorePage from "./feature/store/view/pages/StorePage";
import ProductDetailsPage from "./feature/store/view/pages/ProductDetailsPage";
import CartPage from "./feature/store/view/pages/CartPage"; // Import CartPage
import MyOrdersPage from "./feature/orders/view/pages/MyOrdersPage";
import { ProfileProvider } from "./core/state/profileContext";
import { CraftsProvider } from "./core/state/craftsContext";
import ThemeToggle from "./core/components/ThemeToggle";
import UnderDevelopment from "./core/components/UnderDevelopment";
import MissionPage from "./feature/mission/MissionPage";
import ProductsCat from "./feature/shop/category/view/ProductsCat";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <CraftsProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-base-100 flex flex-col ">
              <Navbar />
              <div className="hidden md:flex fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-primary text-white z-50">
                <ThemeToggle />
              </div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/proof-of-craftsmanship"
                  element={<ProofOfCraftsmanshipPage />}
                />
                <Route path="/my-store" element={<StorePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/new" element={<UnderDevelopment />} />
                <Route path="/artisan" element={<UnderDevelopment />} />
                <Route
                  path="/category/:id/:id/:id"
                  element={<UnderDevelopment />}
                />
                <Route
                  path="/category/:categorySlug"
                  element={<ProductsCat />}
                />
                <Route
                  path="/category/:categorySlug/:subcategorySlug"
                  element={<ProductsCat />}
                />
                <Route path="/custom" element={<UnderDevelopment />} />
                <Route path="/collections" element={<UnderDevelopment />} />
                <Route path="/mission/*" element={<MissionPage />} />
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
