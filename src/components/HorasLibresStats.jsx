import React from 'react';

const HorasLibresStats = () => {
  // Datos de ejemplo para las estadísticas
  const stats = [
    {
      label: 'Horas Acumuladas',
      value: 35,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      label: 'Horas Requeridas',
      value: 48,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      ),
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      label: 'Horas Faltantes',
      value: 13,
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800'
    },
    {
      label: 'Eventos Inscritos',
      value: 3,
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Horas Libres</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} ${stat.textColor} rounded-lg p-4 flex items-center`}
          >
            <div className="mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between mb-1">
          <h4 className="font-medium text-gray-700">Progreso Total</h4>
          <span className="text-sm font-medium text-gray-700">
            58% Completado
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: '58%' }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Te faltan 13 horas libres para completar el requisito.
        </p>
      </div>
    </div>
  );
};

export default HorasLibresStats;