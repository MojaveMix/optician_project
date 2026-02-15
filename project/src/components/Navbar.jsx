import { Link } from 'react-router-dom';
import { Eye, Phone } from 'lucide-react';
import { shopInfo } from '../data/products';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Eye className="w-8 h-8 text-[#1E3A8A]" />
            <span className="text-xl font-bold text-[#1E3A8A]">OptiVision</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#3B82F6] transition-colors">
              Home
            </Link>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-[#3B82F6] transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-[#3B82F6] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-[#3B82F6] transition-colors"
            >
              Contact
            </button>
          </div>

          <a
            href={`tel:${shopInfo.phone}`}
            className="flex items-center space-x-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#3B82F6] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
