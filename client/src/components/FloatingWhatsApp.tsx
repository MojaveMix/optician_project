import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in your eyewear products.");
    window.open(`https://wa.me/212600000000?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
