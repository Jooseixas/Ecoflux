
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import CarbonZero from '../components/CarbonZero';
import Marketplace from '../components/Marketplace';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <Hero />
      <About />
      <CarbonZero />
      <Marketplace />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
