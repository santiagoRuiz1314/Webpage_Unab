import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const links = [
    {
      title: 'Notas',
      description: 'Consulta tus calificaciones',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      ),
      url: 'https://cosmos.unab.edu.co',
      external: true,
      color: 'bg-purple-100'
    },
    {
      title: 'Cursos',
      description: 'Accede a tus materias',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
        </svg>
      ),
      url: 'https://aulavirtual.unab.edu.co',
      external: true,
      color: 'bg-blue-100'
    },
    {
      title: 'Horarios',
      description: 'Consulta tu horario de clases',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      url: 'https://cosmos.unab.edu.co/horario',
      external: true,
      color: 'bg-green-100'
    },
    {
      title: 'Horas Libres',
      description: 'Gestiona tus horas libres',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      url: '/horas-libres',
      external: false,
      color: 'bg-yellow-100'
    },
    {
      title: 'Eventos',
      description: 'Eventos disponibles',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      ),
      url: '/eventos-disponibles',
      external: false,
      color: 'bg-red-100'
    },
    {
      title: 'Mi Perfil',
      description: 'Gestiona tu información',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      url: '/perfil',
      external: false,
      color: 'bg-indigo-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Enlaces Rápidos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <div key={index}>
            {link.external ? (
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${link.color} rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105`}
              >
                {link.icon}
                <h4 className="font-semibold mt-2">{link.title}</h4>
                <p className="text-xs text-gray-600 text-center mt-1">{link.description}</p>
              </a>
            ) : (
              <Link 
                to={link.url}
                className={`${link.color} rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105`}
              >
                {link.icon}
                <h4 className="font-semibold mt-2">{link.title}</h4>
                <p className="text-xs text-gray-600 text-center mt-1">{link.description}</p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;