import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';


const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const  {products } = useAppContext()




  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Collection</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium eyewear designed for style and comfort.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory('FRAME')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'FRAME'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Frames
            </button>
            <button
              onClick={() => setSelectedCategory('SUNGLASSES')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'SUNGLASSES'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sunglasses
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('ALL');
              }}
              className="mt-4 text-[#3B82F6] hover:text-[#1E3A8A] font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
