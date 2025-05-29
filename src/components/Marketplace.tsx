
import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCart } from '../hooks/useCart';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'reforestation', name: 'Reflorestamento' },
    { id: 'renewable', name: 'Energia Renovável' },
    { id: 'conservation', name: 'Conservação' },
    { id: 'technology', name: 'Tecnologia Limpa' },
  ];

  const products = [
    {
      id: 1,
      name: 'Projeto Amazônia Verde',
      description: 'Reflorestamento de 1000 hectares na Amazônia',
      price: 45.00,
      category: 'reforestation',
      image: 'https://plus.unsplash.com/premium_photo-1713021393668-825ae0121138?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      reduction: '1 tonelada CO²'
    },
    {
      id: 2,
      name: 'Energia Solar Nordeste',
      description: 'Usina solar fotovoltaica de 50MW',
      price: 38.50,
      category: 'renewable',
      image: 'https://plus.unsplash.com/premium_photo-1678743133487-d501f3b0696b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      reduction: '1 tonelada CO²'
    },
    {
      id: 3,
      name: 'Restauração Mata Atlântica',
      description: 'Restauração de 500 hectares de Mata Atlântica',
      price: 48.25,
      category: 'reforestation',
      image: 'https://images.unsplash.com/photo-1689090693303-bdb33e3869e3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      reduction: '1 tonelada CO²'
    },
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <section id="marketplace" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Marketplace de Créditos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossa seleção de projetos verificados e escolha os créditos 
            de carbono que melhor se alinham aos valores da sua empresa.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="price">Ordenar por Preço</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum projeto encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Marketplace;
