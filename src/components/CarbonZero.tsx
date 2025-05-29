import React from 'react';
import { CheckCircle, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarbonZero = () => {
  const steps = [
    {
      number: '01',
      title: 'Medição',
      description: 'Calculamos sua pegada de carbono atual com precisão'
    },
    {
      number: '02',
      title: 'Redução',
      description: 'Implementamos estratégias para reduzir emissões'
    },
    {
      number: '03',
      title: 'Compensação',
      description: 'Neutralizamos o restante com créditos verificados'
    },
    {
      number: '04',
      title: 'Certificação',
      description: 'Certificamos sua empresa como Carbono Zero'
    }
  ];

  const benefits = [
    'Redução de até 40% nos custos operacionais',
    'Melhoria na imagem corporativa',
    'Conformidade com regulamentações ambientais',
    'Acesso a financiamentos verdes',
    'Atração de talentos conscientes',
    'Vantagem competitiva no mercado'
  ];

  return (
    <section id="carbon-zero" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Nossa Proposta: Carbono Zero
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformamos sua empresa em uma operação carbono neutro através de um processo 
            estruturado e tecnologicamente avançado.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">
            Como Funciona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-green-500 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-3">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-green-400" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-16 text-white text-center">
          <Calculator className="mx-auto mb-4 text-green-200" size={48} />
          <h3 className="text-3xl font-bold mb-4">Calcule Sua Pegada de Carbono</h3>
          <p className="text-xl mb-6 opacity-90">
            Use nossa calculadora gratuita e descubra quantas toneladas de CO² sua empresa emite
          </p>
          <Link 
            to="/calculator"
            className="inline-block bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
          >
            Calcular Agora
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-green-800 mb-6">
              Benefícios do Carbono Zero
            </h3>
            <p className="text-gray-600 mb-8">
              Além de contribuir para um planeta mais sustentável, tornar-se carbono zero 
              traz vantagens competitivas significativas para sua empresa.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl">
            <img 
              src="https://plus.unsplash.com/premium_photo-1681488347845-6e310c3dd682?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Energia renovável" 
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarbonZero;
