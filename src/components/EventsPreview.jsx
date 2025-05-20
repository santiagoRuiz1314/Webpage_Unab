import React from 'react';
import { Link } from 'react-router-dom';
import {ingenio, semanaIngenieria, ulibrio, unabfest} from '../assets';
// Eliminamos la importación de eventos si no la estamos usando

const EventsPreview = () => {
  // Eventos destacados
  const upcomingEvents = [
    { 
      id: 1, 
      nombre: "IngeniOTIC 2025", 
      fecha: "2025-06-15",
      descripcion: "Evento de innovación tecnológica organizado por la facultad de Ingeniería.",
      imagen: ingenio,
      horas: 8,
      lugar: "Auditorio Mayor"
    },
    { 
      id: 2, 
      nombre: "UNAB Fest", 
      fecha: "2025-05-28",
      descripcion: "Festival cultural con actividades artísticas y musicales para toda la comunidad universitaria.",
      imagen: unabfest,
      horas: 6,
      lugar: "Campus El Jardín"
    },
    { 
      id: 3, 
      nombre: "Semana de Ingeniería", 
      fecha: "2025-07-10",
      descripcion: "Conferencias, talleres y competencias organizadas por la facultad de Ingeniería.",
      imagen: semanaIngenieria,
      horas: 10,
      lugar: "Bloque D"
    },
    { 
      id: 4, 
      nombre: "ULIBRO 2025", 
      fecha: "2025-08-20",
      descripcion: "Feria del libro con presentaciones de autores nacionales e internacionales.",
      imagen: ulibrio,
      horas: 5,
      lugar: "Centro de Convenciones Neomundo"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Próximos Eventos</h3>
        <Link to="/eventos-disponibles" className="text-green-700 hover:text-green-800 font-medium">
          Ver todos
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-200 overflow-hidden">
              {/* Reemplazamos el placeholder SVG por la imagen real */}
              <img 
                src={event.imagen} 
                alt={event.nombre}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{event.nombre}</h4>
                <span className="bg-green-100 text-green-800 text-xs font-medium py-1 px-2 rounded">
                  {event.horas} horas
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {formatDate(event.fecha)}
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {event.lugar}
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {event.descripcion}
              </p>
              
              <div className="flex justify-between items-center">
                <Link 
                  to={`/eventos-disponibles?id=${event.id}`}
                  className="text-green-700 hover:text-green-800 text-sm font-medium inline-flex items-center"
                >
                  Más información
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
                
                <Link 
                  to={`/eventos-disponibles?id=${event.id}&register=true`}
                  className="text-white bg-green-700 hover:bg-green-800 text-sm font-medium py-1 px-3 rounded transition duration-300"
                >
                  Inscribirme
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPreview;