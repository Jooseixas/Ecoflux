
import React from 'react';
import { Leaf, Zap, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Carbono Zero é o Futuro
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Transforme sua pegada de carbono em impacto positivo. 
            Conectamos empresas a soluções sustentáveis através de créditos de carbono verificados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <a
              href="#marketplace"
              className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
            >
              Explore o Marketplace
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors duration-200"
            >
              Saiba Mais
            </a>
          </div>
        </div>

        {/* Feature icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center animate-fade-in">
            <Leaf className="mx-auto mb-4 text-green-300" size={48} />
            <h3 className="text-xl font-semibold mb-2">Sustentabilidade</h3>
            <p className="opacity-80">Projetos verificados de reflorestamento e energia limpa</p>
          </div>
          <div className="text-center animate-fade-in">
            <Zap className="mx-auto mb-4 text-green-300" size={48} />
            <h3 className="text-xl font-semibold mb-2">Tecnologia</h3>
            <p className="opacity-80">Plataforma digital para negociação transparente</p>
          </div>
          <div className="text-center animate-fade-in">
            <Globe className="mx-auto mb-4 text-green-300" size={48} />
            <h3 className="text-xl font-semibold mb-2">Impacto Global</h3>
            <p className="opacity-80">Contribua para um planeta mais sustentável</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
