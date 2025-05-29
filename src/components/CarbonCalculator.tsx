
import React, { useState } from 'react';
import { Calculator, Zap, Car, Home, Plane, Factory, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';

interface CalculationResult {
  total: number;
  breakdown: {
    transport: number;
    energy: number;
    consumption: number;
    travel: number;
  };
  recommendations: string[];
}

const CarbonCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Transporte
    carKm: 0,
    carType: 'gasoline',
    publicTransport: 0,
    
    // Energia
    electricityKwh: 0,
    gasM3: 0,
    heatingType: 'gas',
    
    // Consumo
    flights: 0,
    flightDistance: 'domestic',
    foodType: 'mixed',
    
    // Dados da empresa
    employees: 1,
    industry: 'services'
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCarbon = () => {
    // Fatores de emissão (kg CO2/unidade)
    const factors = {
      car: {
        gasoline: 0.21, // kg CO2/km
        diesel: 0.17,
        hybrid: 0.12,
        electric: 0.05
      },
      electricity: 0.5, // kg CO2/kWh (média Brasil)
      gas: 2.0, // kg CO2/m³
      publicTransport: 0.04, // kg CO2/km
      flights: {
        domestic: 0.15, // kg CO2/km
        international: 0.18
      }
    };

    const transport = (formData.carKm * factors.car[formData.carType as keyof typeof factors.car] * 365) +
                     (formData.publicTransport * factors.publicTransport * 365);
    
    const energy = (formData.electricityKwh * factors.electricity * 12) +
                   (formData.gasM3 * factors.gas * 12);
    
    const travel = formData.flights * (formData.flightDistance === 'domestic' ? 1000 : 3000) * 
                   factors.flights[formData.flightDistance as keyof typeof factors.flights];
    
    const consumption = energy * 0.3; // Estimativa para outros consumos
    
    const total = transport + energy + travel + consumption;
    
    // Multiplicar pelos funcionários se for empresa
    const finalTotal = total * formData.employees;

    const recommendations = [];
    if (transport > finalTotal * 0.4) {
      recommendations.push('Considere usar mais transporte público ou veículos elétricos');
    }
    if (energy > finalTotal * 0.3) {
      recommendations.push('Invista em energia renovável ou melhore a eficiência energética');
    }
    if (travel > finalTotal * 0.2) {
      recommendations.push('Reduza viagens ou prefira videoconferências');
    }

    setResult({
      total: finalTotal,
      breakdown: { transport, energy, consumption, travel },
      recommendations
    });
  };

  const steps = [
    {
      title: 'Transporte',
      icon: Car,
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="carKm">Quilômetros de carro por dia</Label>
            <Slider
              value={[formData.carKm]}
              onValueChange={(value) => setFormData({...formData, carKm: value[0]})}
              max={200}
              step={5}
              className="mt-2"
            />
            <span className="text-sm text-gray-600">{formData.carKm} km/dia</span>
          </div>
          
          <div>
            <Label htmlFor="carType">Tipo de veículo</Label>
            <select
              value={formData.carType}
              onChange={(e) => setFormData({...formData, carType: e.target.value})}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="gasoline">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Híbrido</option>
              <option value="electric">Elétrico</option>
            </select>
          </div>

          <div>
            <Label htmlFor="publicTransport">Transporte público (km/dia)</Label>
            <Slider
              value={[formData.publicTransport]}
              onValueChange={(value) => setFormData({...formData, publicTransport: value[0]})}
              max={100}
              step={5}
              className="mt-2"
            />
            <span className="text-sm text-gray-600">{formData.publicTransport} km/dia</span>
          </div>
        </div>
      )
    },
    {
      title: 'Energia',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="electricityKwh">Consumo elétrico mensal (kWh)</Label>
            <Input
              type="number"
              value={formData.electricityKwh}
              onChange={(e) => setFormData({...formData, electricityKwh: Number(e.target.value)})}
              placeholder="300"
            />
          </div>
          
          <div>
            <Label htmlFor="gasM3">Consumo de gás mensal (m³)</Label>
            <Input
              type="number"
              value={formData.gasM3}
              onChange={(e) => setFormData({...formData, gasM3: Number(e.target.value)})}
              placeholder="50"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Viagens',
      icon: Plane,
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="flights">Número de voos por ano</Label>
            <Slider
              value={[formData.flights]}
              onValueChange={(value) => setFormData({...formData, flights: value[0]})}
              max={20}
              step={1}
              className="mt-2"
            />
            <span className="text-sm text-gray-600">{formData.flights} voos/ano</span>
          </div>
          
          <div>
            <Label htmlFor="flightDistance">Tipo de voo mais comum</Label>
            <select
              value={formData.flightDistance}
              onChange={(e) => setFormData({...formData, flightDistance: e.target.value})}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="domestic">Doméstico</option>
              <option value="international">Internacional</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: 'Empresa',
      icon: Factory,
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="employees">Número de funcionários</Label>
            <Input
              type="number"
              value={formData.employees}
              onChange={(e) => setFormData({...formData, employees: Number(e.target.value)})}
              placeholder="1"
              min="1"
            />
          </div>
          
          <div>
            <Label htmlFor="industry">Setor da empresa</Label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="services">Serviços</option>
              <option value="manufacturing">Manufatura</option>
              <option value="technology">Tecnologia</option>
              <option value="retail">Varejo</option>
              <option value="construction">Construção</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Calculator className="mx-auto mb-4 text-green-600" size={64} />
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Calculadora de Carbono
          </h1>
          <p className="text-xl text-gray-600">
            Descubra sua pegada de carbono e como neutralizá-la
          </p>
        </div>

        {!result ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index <= currentStep ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index <= currentStep ? 'bg-green-100' : 'bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 h-0.5 ${
                            index < currentStep ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                {steps[currentStep].title}
              </h2>
              {steps[currentStep].content}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={calculateCarbon}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Calcular Pegada
                </Button>
              )}
            </div>
          </div>
        ) : (
          // Results
          <div className="space-y-8">
            {/* Main Result */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
              <Leaf className="mx-auto mb-4" size={64} />
              <h2 className="text-3xl font-bold mb-2">Sua Pegada de Carbono</h2>
              <div className="text-5xl font-bold mb-4">
                {result.total.toFixed(1)} <span className="text-2xl">toneladas CO²/ano</span>
              </div>
              <p className="text-green-100">
                {result.total > 10 ? 'Acima da média' : 'Dentro da média'} brasileira (8-12 toneladas/ano)
              </p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: 'transport', label: 'Transporte', icon: Car, color: 'blue' },
                { key: 'energy', label: 'Energia', icon: Zap, color: 'yellow' },
                { key: 'travel', label: 'Viagens', icon: Plane, color: 'purple' },
                { key: 'consumption', label: 'Consumo', icon: Home, color: 'red' }
              ].map(({ key, label, icon: Icon, color }) => (
                <div key={key} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className={`text-${color}-600 mb-4`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{label}</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.breakdown[key as keyof typeof result.breakdown].toFixed(1)}t
                  </div>
                  <div className="text-sm text-gray-600">
                    {((result.breakdown[key as keyof typeof result.breakdown] / result.total) * 100).toFixed(0)}% do total
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Recomendações</h3>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Pronto para ser Carbono Zero?
              </h3>
              <p className="text-gray-600 mb-6">
                Explore nosso marketplace e encontre os créditos ideais para neutralizar sua pegada
              </p>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setResult(null)}
              >
                Calcular Novamente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonCalculator;
