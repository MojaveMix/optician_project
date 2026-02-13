import { Eye, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Eye className="h-8 w-8 text-[#1E3A8A]" />
            <span className="text-xl font-bold text-[#1E3A8A]">
              {import.meta.env.VITE_APP_NAME} Optics
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-[#1E3A8A] font-medium transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-gray-700 hover:text-[#1E3A8A] font-medium transition"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-[#1E3A8A] font-medium transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-[#1E3A8A] font-medium transition"
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-[#1E3A8A]"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 text-gray-700 hover:text-[#1E3A8A] font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="block w-full text-left py-2 text-gray-700 hover:text-[#1E3A8A] font-medium"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-gray-700 hover:text-[#1E3A8A] font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-gray-700 hover:text-[#1E3A8A] font-medium"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
