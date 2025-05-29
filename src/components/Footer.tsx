
import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/fotos/ca270d6a-746e-4979-b779-ae1e5f80aa9a.png" 
                alt="EcoFlux Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">Ecoflux</h3>

              </div>
            </div>
            <p className="text-green-200 mb-4">
              Transformando empresas em operações carbono zero através de soluções sustentáveis e tecnologia.
            </p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-green-300 cursor-pointer transition-colors" size={20} />
              <Instagram className="hover:text-green-300 cursor-pointer transition-colors" size={20} />
              <Linkedin className="hover:text-green-300 cursor-pointer transition-colors" size={20} />
              <Twitter className="hover:text-green-300 cursor-pointer transition-colors" size={20} />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-green-200 hover:text-white transition-colors">Início</a></li>
              <li><a href="#about" className="text-green-200 hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#carbon-zero" className="text-green-200 hover:text-white transition-colors">Carbono Zero</a></li>
              <li><a href="#marketplace" className="text-green-200 hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#contact" className="text-green-200 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><span className="text-green-200">Créditos de Carbono</span></li>
              <li><span className="text-green-200">Consultoria Sustentável</span></li>
              <li><span className="text-green-200">Certificação Carbono Zero</span></li>
              <li><span className="text-green-200">Calculadora de Pegada</span></li>
              <li><span className="text-green-200">Relatórios ESG</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-green-300" />
                <span className="text-green-200">contato@ecoflux.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-green-300" />
                <span className="text-green-200">(14) 99999-9999</span>
              </div>
              <div className="text-green-200">
                <p> R. Bahia, 40 </p>
                <p>Marília - SP, 17501-900,0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-300">
            © 2025 EcoFlux Carbon Credits. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
