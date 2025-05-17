import React, { useState } from 'react';

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm leading-5 font-medium text-blue-800">Información importante</h3>
          <div className="mt-2 text-sm leading-5 text-blue-700">
            <p>
              Bienvenido al Portal Estudiantil UNAB. Recuerda que el periodo de inscripción para el semestre 2025-2 está abierto hasta el 30 de mayo.
            </p>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button 
                  type="button" 
                  className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs leading-4 font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:bg-blue-200 transition ease-in-out duration-150"
                >
                  Más información
                </button>
                <button 
                  type="button"
                  onClick={closeBanner}
                  className="ml-3 px-3 py-1.5 bg-blue-100 text-blue-800 text-xs leading-4 font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:bg-blue-200 transition ease-in-out duration-150"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;