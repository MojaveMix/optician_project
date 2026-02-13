import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Glasses, Sun, Grid3x3 } from 'lucide-react';

export default function ProductGrid() {
  const [filter, setFilter] = useState<'ALL' | 'FRAME' | 'SUNGLASSES'>('ALL');

  const filteredProducts = filter === 'ALL'
    ? products
    : products.filter(product => product.category === filter);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1E3A8A] mb-4">
            Our Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium eyewear from world-renowned brands
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${
              filter === 'ALL'
                ? 'bg-[#1E3A8A] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Grid3x3 className="h-5 w-5" />
            <span>All Products</span>
          </button>
          <button
            onClick={() => setFilter('FRAME')}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${
              filter === 'FRAME'
                ? 'bg-[#1E3A8A] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Glasses className="h-5 w-5" />
            <span>Frames</span>
          </button>
          <button
            onClick={() => setFilter('SUNGLASSES')}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${
              filter === 'SUNGLASSES'
                ? 'bg-[#1E3A8A] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Sun className="h-5 w-5" />
            <span>Sunglasses</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
