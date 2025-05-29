
import React from 'react';
import { Plus, Award, Leaf } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  certification: string;
  reduction: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {product.certification}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-green-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-4 space-x-4">
          <div className="flex items-center text-green-600">
            <Leaf size={16} className="mr-1" />
            <span className="text-sm">{product.reduction}</span>
          </div>
          <div className="flex items-center text-blue-600">
            <Award size={16} className="mr-1" />
            <span className="text-sm">Verificado</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-800">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/ crédito</span>
          </div>
          
          <button
            onClick={onAddToCart}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
