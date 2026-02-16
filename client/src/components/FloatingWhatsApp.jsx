import { MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '../utils/whatsapp';

const FloatingWhatsApp = () => {
  const handleClick = () => {
    const message = 'Hello, I would like to inquire about your products and services.';
    window.open(generateGeneralWhatsAppLink(message), '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us on WhatsApp
      </span>
    </button>
  );
};

export default FloatingWhatsApp;
