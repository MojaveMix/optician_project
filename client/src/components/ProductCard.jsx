import { Star, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateWhatsAppOrderLink } from "../utils/whatsapp";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleOrderWhatsApp = (e) => {
    e.stopPropagation();
    window.open(generateWhatsAppOrderLink(product), "_blank");
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
    >
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          src={
            product.img_path
              ? import.meta.env.VITE_URL_IMG + product.id
              : "/img/glasses.jpeg"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        {product.stock_quantity < 10 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Only {product.stock_quantity} left
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#3B82F6] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          <span className="bg-[#1E3A8A] text-white text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.floor(product.rating || 4.8)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating || 4.8})
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-[#1E3A8A]">
              {product.selling_price}
            </span>
            <span className="text-gray-600 ml-1">MAD</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 text-[#1E3A8A] py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button
            onClick={handleOrderWhatsApp}
            className="flex-1 bg-[#25D366] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
