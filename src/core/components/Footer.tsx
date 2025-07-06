import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center gap-6">
        {/* Centered Logo */}
        <img src="/aisha/logo.png" alt="Aisha Logo" className="w-42 md:w-42" />

        {/* Centered Social Icons */}
        <div className="flex flex-col  gap-4 text-2xl">
          <div className="flex flex-row gap-4 justify-center">
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <FaFacebook className="text-3xl" />
            </a>
          </div>
          <p className="text-xl text-gray-500">
            © {new Date().getFullYear()} All rights reserved — Aisha.
          </p>
        </div>
      </div>

      {/* Footer Text */}
    </footer>
  );
}
