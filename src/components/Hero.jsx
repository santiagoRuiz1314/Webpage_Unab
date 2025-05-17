import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-green-700 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido al Portal Estudiantil UNAB
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Tu plataforma integral para gestionar tus actividades académicas, eventos y horas libres.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('eventos')}
              className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Explorar Eventos
            </button>
            <Link 
              to="/perfil"
              className="bg-transparent hover:bg-green-800 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
            >
              Ver mi Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;