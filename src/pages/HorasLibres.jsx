import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { estudiante } from '../data/estudiante';

const HorasLibres = () => {
  const [activeTab, setActiveTab] = useState('resumen');
  
  // Información del estudiante
  const {horasLibres, eventosRegistrados } = estudiante;
  const horasRequeridas = 60; // Total de horas requeridas
  const horasFaltantes = Math.max(0, horasRequeridas - horasLibres);
  const porcentajeCompletado = Math.min(100, (horasLibres / horasRequeridas) * 100);
  
  // Historial de eventos y certificados con horas
  const historialEventos = [
    {
      id: 1,
      nombre: "Taller de Innovación",
      fecha: "2025-05-10",
      horas: 8,
      tipo: "Evento",
      descripcion: "Participación en taller de innovación tecnológica",
      estado: "Verificado"
    },
    {
      id: 2,
      nombre: "Hackathon UNAB",
      fecha: "2025-06-01",
      horas: 12,
      tipo: "Evento",
      descripcion: "Participación en hackathon de desarrollo de software",
      estado: "Pendiente"
    },
    {
      id: 3,
      nombre: "Voluntariado Biblioteca",
      fecha: "2025-04-20",
      horas: 15,
      tipo: "Voluntariado",
      descripcion: "Apoyo en catalogación de libros y atención al público",
      estado: "Verificado"
    }
  ];
  
  // Eventos y actividades disponibles para registrarse
  const eventosProgramados = [
    { 
      id: 1, 
      nombre: "IngeniOTIC 2025", 
      fecha: "2025-06-15",
      descripcion: "Evento de innovación tecnológica organizado por la facultad de Ingeniería.",
      horas: 8,
      lugar: "Auditorio Mayor",
      categoria: "Académico"
    },
    { 
      id: 2, 
      nombre: "UNAB Fest", 
      fecha: "2025-05-28",
      descripcion: "Festival cultural con actividades artísticas y musicales para toda la comunidad universitaria.",
      horas: 6,
      lugar: "Campus El Jardín",
      categoria: "Cultural"
    },
    { 
      id: 3, 
      nombre: "Semana de Ingeniería", 
      fecha: "2025-07-10",
      descripcion: "Conferencias, talleres y competencias organizadas por la facultad de Ingeniería.",
      horas: 10,
      lugar: "Bloque D",
      categoria: "Académico"
    },
    { 
      id: 4, 
      nombre: "ULIBRO 2025", 
      fecha: "2025-08-20",
      descripcion: "Feria del libro con presentaciones de autores nacionales e internacionales.",
      horas: 5,
      lugar: "Centro de Convenciones Neomundo",
      categoria: "Cultural"
    },
    {
      id: 5,
      nombre: "Voluntariado Comunitario",
      fecha: "2025-06-05",
      descripcion: "Programa de voluntariado en comunidades vulnerables de la región.",
      horas: 20,
      lugar: "Varios lugares",
      categoria: "Social"
    }
  ];

  // Categorías de horas libres
  const categorias = [
    {
      nombre: "Académicas",
      descripcion: "Participación en eventos, conferencias y talleres académicos",
      horasAcumuladas: 20,
      color: "bg-blue-100 text-blue-800"
    },
    {
      nombre: "Culturales",
      descripcion: "Actividades artísticas, musicales y culturales",
      horasAcumuladas: 5,
      color: "bg-purple-100 text-purple-800"
    },
    {
      nombre: "Deportivas",
      descripcion: "Participación en eventos deportivos y representación institucional",
      horasAcumuladas: 0,
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      nombre: "Sociales",
      descripcion: "Voluntariado y actividades de proyección social",
      horasAcumuladas: 10,
      color: "bg-green-100 text-green-800"
    }
  ];
  
  // Requisitos y normativas
  const requisitos = [
    "Cada estudiante debe completar un mínimo de 48 horas libres para poder graduarse.",
    "Las horas deben estar distribuidas en al menos dos categorías diferentes.",
    "La participación en eventos debe ser certificada por el organizador a través del portal.",
    "Las horas de voluntariado deben ser verificadas por el coordinador del programa de voluntariado.",
    "El máximo de horas que se pueden acumular en un solo evento es de 20 horas.",
    "Las horas libres deben completarse antes del último semestre académico."
  ];

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función para clasificar el color del estado
  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'Verificado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Actualizado con el nuevo color */}
      <div className="bg-[#3d3dea] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Horas Libres</h1>
          <p className="opacity-90">
            Gestiona tus horas libres, eventos registrados y certificados
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Resumen de Horas Libres */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/4 pr-0 md:pr-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de Horas Libres</h2>
                
                {/* Progreso General */}
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-700">Progreso Total</h3>
                    <span className="text-sm font-medium text-gray-700">
                      {porcentajeCompletado.toFixed(0)}% Completado
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-[#3d3dea] h-2.5 rounded-full" 
                      style={{ width: `${porcentajeCompletado}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {horasFaltantes > 0 
                      ? `Te faltan ${horasFaltantes} horas para completar el requisito.`
                      : "¡Has completado todas las horas requeridas!"
                    }
                  </p>
                </div>
                
                {/* Estadísticas por Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {categorias.map((categoria, index) => (
                    <div key={index} className={`${categoria.color} rounded-lg p-4`}>
                      <h4 className="font-semibold mb-1">{categoria.nombre}</h4>
                      <p className="text-sm mb-2">{categoria.descripcion}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Horas acumuladas</span>
                        <span className="text-lg font-bold">{categoria.horasAcumuladas}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/4 mt-6 md:mt-0">
                <div className="bg-[#3d3dea]/10 rounded-lg p-6 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-[#3d3dea]/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#3d3dea]">{horasLibres}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Horas Acumuladas</h3>
                    <p className="text-sm text-gray-600 mb-3">De {horasRequeridas} horas requeridas</p>
                    <Link 
                      to="/eventos-disponibles"
                      className="inline-block bg-[#3d3dea] hover:bg-[#2d2dd4] text-white text-sm font-medium py-2 px-4 rounded transition duration-300 w-full"
                    >
                      Inscribirme a Eventos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs de navegación */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('resumen')} 
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'resumen' 
                      ? 'border-[#3d3dea] text-[#3d3dea]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Resumen y Eventos
                </button>
                <button
                  onClick={() => setActiveTab('historial')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'historial' 
                      ? 'border-[#3d3dea] text-[#3d3dea]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Historial Completo
                </button>
                <button
                  onClick={() => setActiveTab('normativas')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'normativas' 
                      ? 'border-[#3d3dea] text-[#3d3dea]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Normativas
                </button>
                <button
                  onClick={() => setActiveTab('certificados')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'certificados' 
                      ? 'border-[#3d3dea] text-[#3d3dea]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Subir Certificados
                </button>
              </nav>
            </div>
            
            {/* Contenido de las tabs */}
            <div className="p-6">
              {/* Tab: Resumen y Eventos */}
              {activeTab === 'resumen' && (
                <div>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Eventos Registrados</h3>
                      <Link 
                        to="/eventos-registrados"
                        className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                      >
                        Ver todos
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </div>
                    
                    {eventosRegistrados.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {eventosRegistrados.map((evento) => (
                          <div key={evento.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-800 mb-2">{evento.nombre}</h4>
                              
                              <div className="flex items-center text-sm text-gray-600 mb-4">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {formatDate(evento.fecha)}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <Link 
                                  to={`/eventos-registrados?id=${evento.id}`}
                                  className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                                >
                                  Ver detalles
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                  </svg>
                                </Link>
                                
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">
                                  Registrado
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">No hay eventos registrados</h4>
                        <p className="text-gray-600 mb-4">Actualmente no tienes eventos registrados. Explora los eventos disponibles y regístrate.</p>
                        <Link 
                          to="/eventos-disponibles" 
                          className="inline-block bg-[#3d3dea] hover:bg-[#2d2dd4] text-white font-medium py-2 px-4 rounded transition duration-300"
                        >
                          Ver Eventos Disponibles
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Próximos Eventos Recomendados</h3>
                      <Link 
                        to="/eventos-disponibles"
                        className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                      >
                        Ver todos
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {eventosProgramados.slice(0, 3).map((evento) => (
                        <div key={evento.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-32 bg-gray-200 flex items-center justify-center">
                            {/* Placeholder para imágenes reales */}
                            <div className={`w-full h-full flex items-center justify-center ${evento.id % 2 === 0 ? 'bg-blue-100' : 'bg-[#3d3dea]/10'}`}>
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">{evento.nombre}</h4>
                              <span className="bg-[#3d3dea]/10 text-[#3d3dea] text-xs font-medium py-1 px-2 rounded">
                                {evento.horas} horas
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              {formatDate(evento.fecha)}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                              {evento.lugar}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {evento.descripcion}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <Link 
                                to={`/eventos-disponibles?id=${evento.id}`}
                                className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                              >
                                Más información
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                              </Link>
                              
                              <Link 
                                to={`/eventos-disponibles?id=${evento.id}&register=true`}
                                className="text-white bg-[#3d3dea] hover:bg-[#2d2dd4] text-sm font-medium py-1 px-3 rounded transition duration-300"
                              >
                                Inscribirme
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tab: Historial Completo */}
              {activeTab === 'historial' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Horas Libres</h3>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {historialEventos.map((evento) => (
                            <tr key={evento.id} className="hover:bg-gray-50 transition">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{evento.nombre}</div>
                                    <div className="text-sm text-gray-500">{evento.descripcion}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(evento.fecha)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {evento.tipo}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {evento.horas}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoClass(evento.estado)}`}>
                                  {evento.estado}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link to={`/eventos-registrados?id=${evento.id}`} className="text-[#3d3dea] hover:text-[#2d2dd4] mr-3">Ver</Link>
                                <button className="text-gray-600 hover:text-gray-900">Descargar</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Filtros y búsqueda */}
                  <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="md:w-1/4">
                      <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                      <input type="date" id="fechaHasta" name="fechaHasta" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm rounded-md" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tab: Normativas */}
              {activeTab === 'normativas' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Normativas y Requisitos</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm leading-5 font-medium text-blue-800">Información importante</h4>
                        <div className="mt-1 text-sm leading-5 text-blue-700">
                          <p>Las horas libres son un requisito para la graduación. Asegúrate de revisar la normativa vigente y cumplir con los requisitos establecidos.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                    <div className="p-6">
                      <h4 className="text-md font-semibold text-gray-800 mb-4">Requisitos Generales</h4>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        {requisitos.map((requisito, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-[#3d3dea] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{requisito}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="text-md font-semibold text-gray-800 mb-4">Categorías de Horas Libres</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categorias.map((categoria, index) => (
                          <div key={index} className={`${categoria.color} rounded-lg p-4`}>
                            <h5 className="font-semibold mb-2">{categoria.nombre}</h5>
                            <p className="text-sm mb-2">{categoria.descripcion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-md font-semibold text-gray-800 mb-4">Preguntas Frecuentes</h4>
                      
                      <div className="space-y-4">
                        <div className="border-b border-gray-200 pb-4">
                          <h5 className="font-medium text-gray-800 mb-2">¿Cómo puedo registrar mis horas libres?</h5>
                          <p className="text-sm text-gray-600">
                            Puedes registrar tus horas libres de tres formas: inscribiéndote en eventos oficiales de la universidad a través del portal, subiendo certificados de participación en actividades externas, o solicitando la validación de voluntariados y otras actividades al Departamento de Bienestar Universitario.
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                          <h5 className="font-medium text-gray-800 mb-2">¿Cuándo debo completar mis horas libres?</h5>
                          <p className="text-sm text-gray-600">
                            Se recomienda completar las horas libres progresivamente a lo largo de la carrera. El plazo máximo para completarlas es antes de iniciar el último semestre académico.
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                          <h5 className="font-medium text-gray-800 mb-2">¿Qué sucede si no completo mis horas libres?</h5>
                          <p className="text-sm text-gray-600">
                            Las horas libres son un requisito para la graduación. Si no se completan, no se podrá iniciar el proceso de grado hasta cumplir con este requisito.
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">¿Puedo transferir horas de una categoría a otra?</h5>
                          <p className="text-sm text-gray-600">
                            No es posible transferir horas entre categorías. Se debe cumplir con el mínimo establecido para cada categoría según lo establecido en la normativa vigente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tab: Subir Certificados */}
              {activeTab === 'certificados' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Subir Certificados</h3>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm leading-5 font-medium text-yellow-800">Importante</h4>
                        <div className="mt-1 text-sm leading-5 text-yellow-700">
                          <p>Los certificados deben estar en formato PDF y no superar los 5MB. La validación puede tomar hasta 5 días hábiles.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                    <div className="p-6">
                      <form>
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="actividad" className="block text-sm font-medium text-gray-700">Nombre de la Actividad</label>
                            <input type="text" name="actividad" id="actividad" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm" placeholder="Ej: Taller de Liderazgo" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="tipoActividad" className="block text-sm font-medium text-gray-700">Tipo de Actividad</label>
                              <select id="tipoActividad" name="tipoActividad" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm">
                                <option value="">Selecciona un tipo</option>
                                <option value="Evento">Evento</option>
                                <option value="Voluntariado">Voluntariado</option>
                                <option value="Curso">Curso</option>
                                <option value="Otro">Otro</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
                              <select id="categoria" name="categoria" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm">
                                <option value="">Selecciona una categoría</option>
                                <option value="Académicas">Académicas</option>
                                <option value="Culturales">Culturales</option>
                                <option value="Deportivas">Deportivas</option>
                                <option value="Sociales">Sociales</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="fechaActividad" className="block text-sm font-medium text-gray-700">Fecha de la Actividad</label>
                              <input type="date" name="fechaActividad" id="fechaActividad" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm" />
                            </div>
                            
                            <div>
                              <label htmlFor="horasAcumuladas" className="block text-sm font-medium text-gray-700">Horas Acumuladas</label>
                              <input type="number" name="horasAcumuladas" id="horasAcumuladas" min="1" max="20" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm" placeholder="Ej: 8" />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción de la Actividad</label>
                            <textarea id="descripcion" name="descripcion" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm" placeholder="Describe brevemente la actividad realizada"></textarea>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Certificado</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#3d3dea] hover:text-[#2d2dd4] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#3d3dea]">
                                    <span>Subir un archivo</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                  </label>
                                  <p className="pl-1">o arrastrar y soltar</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF hasta 5MB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d3dea] mr-3">
                            Cancelar
                          </button>
                          <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3d3dea] hover:bg-[#2d2dd4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d3dea]">
                            Enviar para Validación
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-md font-semibold text-gray-800">Certificados Enviados Recientemente</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-800">Curso de Primeros Auxilios</h5>
                            <p className="text-sm text-gray-600">Enviado: 10 de mayo de 2025</p>
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            En revisión
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-800">Voluntariado Cruz Roja</h5>
                            <p className="text-sm text-gray-600">Enviado: 05 de mayo de 2025</p>
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Aprobado
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Enlaces Rápidos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                to="/eventos-disponibles"
                className="bg-[#3d3dea]/10 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-[#3d3dea] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h4 className="font-semibold text-center">Ver Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Eventos disponibles</p>
              </Link>
              
              <Link 
                to="/eventos-registrados"
                className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
                <h4 className="font-semibold text-center">Mis Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Eventos registrados</p>
              </Link>
              
              <Link 
                to="/perfil"
                className="bg-purple-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <h4 className="font-semibold text-center">Mi Perfil</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver mi información</p>
              </Link>
              
              <a 
                href="https://aulavirtual.unab.edu.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
                <h4 className="font-semibold text-center">Aula Virtual</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Accede a tus materias</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorasLibres;