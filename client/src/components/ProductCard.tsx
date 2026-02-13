import { MessageCircle, Tag } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export default function ProductCard({
  name,
  brand,
  category,
  price,
  description,
  image,
}: ProductCardProps) {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello! I would like to order:\n\nProduct: ${name}\nBrand: ${brand}\nPrice: ${price}\n\nFrom VisionPro Optics`,
    );
    window.open(`https://wa.me/212600000000?text=${message}`, "_blank");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              category === "SUNGLASSES"
                ? "bg-amber-500 text-white"
                : "bg-[#3B82F6] text-white"
            }`}
          >
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <Tag className="h-5 w-5 text-[#3B82F6]" />
        </div>

        <p className="text-sm text-gray-600 mb-3">{brand}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg mr-1 font-bold text-[#1E3A8A]">{price}</span>
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
