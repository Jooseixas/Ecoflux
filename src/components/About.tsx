
import React from 'react';
import { Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Quem Somos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A EcoFlux é pioneira no mercado brasileiro de créditos de carbono, 
            conectando empresas conscientes a projetos sustentáveis verificados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-green-800 mb-6">Nossa História</h3>
            <p className="text-gray-600 mb-4">
              Fundada em 2020, nascemos da necessidade urgente de democratizar o acesso 
              ao mercado de carbono no Brasil. Nosso time é formado por especialistas em 
              sustentabilidade, tecnologia e finanças verdes.
            </p>
            <p className="text-gray-600 mb-6">
              Hoje, somos a principal plataforma digital para negociação de créditos de 
              carbono verificados, facilitando a transição das empresas para operações 
              carbono neutro.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-green-100 px-4 py-2 rounded-full">
                <span className="text-green-800 font-semibold">500+ Empresas</span>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-full">
                <span className="text-green-800 font-semibold">1M+ Toneladas CO²</span>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-full">
                <span className="text-green-800 font-semibold">50+ Projetos</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl">
            <img 
              src="https://plus.unsplash.com/premium_photo-1664637952509-c2627f44406b?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Floresta sustentável" 
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Users className="mx-auto mb-4 text-green-600" size={48} />
            <h4 className="text-xl font-bold text-green-800 mb-3">Equipe Especializada</h4>
            <p className="text-gray-600">
              Profissionais com mais de 10 anos de experiência em sustentabilidade e mercado de carbono.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Target className="mx-auto mb-4 text-green-600" size={48} />
            <h4 className="text-xl font-bold text-green-800 mb-3">Missão Clara</h4>
            <p className="text-gray-600">
              Acelerar a transição para uma economia de baixo carbono através da tecnologia.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Award className="mx-auto mb-4 text-green-600" size={48} />
            <h4 className="text-xl font-bold text-green-800 mb-3">Certificações</h4>
            <p className="text-gray-600">
              Todos os projetos são verificados pelos padrões internacionais VCS e Gold Standard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
