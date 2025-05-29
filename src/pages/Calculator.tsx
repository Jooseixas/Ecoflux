
import React from 'react';
import Header from '../components/Header';
import CarbonCalculator from '../components/CarbonCalculator';
import Footer from '../components/Footer';

const Calculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <CarbonCalculator />
      <Footer />
    </div>
  );
};

export default Calculator;
