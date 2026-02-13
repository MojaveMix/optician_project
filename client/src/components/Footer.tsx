import { Eye, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-8 w-8" />
              <span className="text-xl font-bold">VisionPro Optics</span>
            </div>
            <p className="text-gray-300">
              Your trusted partner for quality eyewear and professional eye care services.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-white transition">Products</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">+212 600 000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">info@visionpro.ma</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">123 Boulevard Mohammed V, Casablanca</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 9:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} VisionPro Optics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
