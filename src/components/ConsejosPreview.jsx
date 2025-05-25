import React from 'react';
import { Link } from 'react-router-dom';
import { consejos, categorias } from '../data/consejos';

const ConsejosPreview = () => {
  // Obtener los 3 consejos más populares
  const consejosDestacados = consejos
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Obtener categoría por ID
  const getCategoriaById = (id) => {
    return categorias.find(cat => cat.id === id.toLowerCase()) || categorias[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Consejos Estudiantiles</h3>
        <Link to="/consejos-estudiantiles" className="text-green-700 hover:text-green-800 font-medium">
          Ver todos
        </Link>
      </div>
      
      <div className="space-y-4">
        {consejosDestacados.map((consejo) => {
          const categoria = getCategoriaById(consejo.categoria);
          return (
            <div key={consejo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800 line-clamp-2">{consejo.titulo}</h4>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${categoria.color} whitespace-nowrap`}>
                  {categoria.icono} {categoria.nombre}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {consejo.contenido}
              </p>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    {consejo.autor}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {consejo.likes}
                  </span>
                </div>
                <span>{formatDate(consejo.fechaPublicacion)}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <Link 
          to="/consejos-estudiantiles" 
          className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
        >
          Ver más consejos estudiantiles
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ConsejosPreview;