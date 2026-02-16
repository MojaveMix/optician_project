import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Shield,
  Award,
  CheckCircle,
  Plus,
  Minus,
} from "lucide-react";
import { generateWhatsAppOrderLink } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useCallback } from "react";
import { GetMethod } from "../data/methodes";
import { useEffect } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

  const fetchProductById = useCallback(async () => {
    try {
      const data = await GetMethod(`/products/show/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h2>
            <Link
              to="/"
              className="text-[#3B82F6] hover:text-[#1E3A8A] font-semibold flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleOrderWhatsApp = () => {
    window.open(generateWhatsAppOrderLink(product, quantity), "_blank");
  };

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-[#1E3A8A] mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12">
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl bg-gray-100 group">
                  <img
                    src={
                      product.img_path
                        ? import.meta.env.VITE_URL_IMG + product.id
                        : "/img/glasses.png"
                    }
                    alt={product.name}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.is_featured && (
                    <div className="absolute top-4 left-4 bg-[#10B981] text-white px-4 py-2 rounded-full font-semibold">
                      Featured Product
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Shield className="w-6 h-6 text-[#1E3A8A] mx-auto mb-2" />
                    <p className="text-xs font-semibold">100% Authentic</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Award className="w-6 h-6 text-[#1E3A8A] mx-auto mb-2" />
                    <p className="text-xs font-semibold">Warranty Included</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <CheckCircle className="w-6 h-6 text-[#1E3A8A] mx-auto mb-2" />
                    <p className="text-xs font-semibold">Premium Quality</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#1E3A8A] text-white text-sm px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-5 h-5 ${
                            index < Math.floor(product.rating || 4.8)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600 font-semibold">
                        ({product.rating || 4.8})
                      </span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-xl text-gray-600">{product.brand}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold text-[#1E3A8A]">
                      {product.selling_price}
                    </span>
                    <span className="text-2xl text-gray-600 ml-2">MAD</span>
                  </div>
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${
                      product.stock_quantity > 10
                        ? "bg-green-100 text-green-800"
                        : product.stock_quantity > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock_quantity > 10
                      ? "In Stock"
                      : product.stock_quantity > 0
                        ? `Only ${product.stock_quantity} left`
                        : "Out of Stock"}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Product Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock_quantity}
                      className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Total: </strong>
                      <span className="text-2xl font-bold text-[#1E3A8A]">
                        {product.selling_price * quantity}
                      </span>
                      <span className="text-lg"> MAD</span>
                    </p>
                  </div>

                  <button
                    onClick={handleOrderWhatsApp}
                    disabled={product.stock_quantity === 0}
                    className="w-full bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#20BA5A] transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Order via WhatsApp</span>
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    Click to complete your order through WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Premium Materials
                  </h3>
                  <p className="text-gray-600">
                    Crafted from high-quality materials for lasting durability
                    and comfort.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    UV Protection
                  </h3>
                  <p className="text-gray-600">
                    Complete protection against harmful UV rays for your eye
                    health.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Professional Fitting
                  </h3>
                  <p className="text-gray-600">
                    Expert assistance available for perfect fitting and
                    adjustment.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Warranty Coverage
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive warranty for manufacturing defects and quality
                    issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
