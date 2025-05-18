import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { estudiante } from '../data/estudiante';

const EventosRegistrados = () => {
  const [activeTab, setActiveTab] = useState('proximos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Eventos registrados por el estudiante (desde estudiante.js)
  const eventosRegistrados = estudiante.eventosRegistrados || [];
  
  // Eventos adicionales para mostrar más ejemplos
  const eventosCompletados = [
    { 
      id: 101, 
      nombre: "Taller de Innovación", 
      fecha: "2025-05-10",
      descripcion: "Participación en taller de innovación tecnológica donde se abordaron temas de metodologías ágiles y pensamiento de diseño para la resolución de problemas.",
      horas: 8,
      lugar: "Auditorio Menor",
      categoria: "Académico",
      estado: "Completado",
      asistencia: "Verificada",
      certificado: true
    }
  ];
  
  // Eventos ficticios para mostrar diferentes estados
  const todosEventos = [
    ...eventosRegistrados.map(ev => ({
      ...ev,
      descripcion: ev.id === 1 
        ? "Participación en taller de innovación tecnológica donde se abordaron temas de metodologías ágiles y pensamiento de diseño para la resolución de problemas." 
        : "Competencia de desarrollo de software con duración de 48 horas donde los participantes crean soluciones innovadoras a problemáticas reales.",
      lugar: ev.id === 1 ? "Auditorio Menor" : "Centro de Innovación UNAB",
      categoria: "Académico",
      estado: "Próximo",
      horas: ev.id === 1 ? 8 : 12,
      asistencia: "Pendiente",
      certificado: false
    })),
    ...eventosCompletados
  ];
  
  // Filtrar eventos según el término de búsqueda
  const filteredEventos = todosEventos.filter(evento => 
    evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filtrar eventos según la tab activa
  const currentEvents = activeTab === 'todos' 
    ? filteredEventos 
    : activeTab === 'proximos' 
      ? filteredEventos.filter(evento => evento.estado === 'Próximo')
      : filteredEventos.filter(evento => evento.estado === 'Completado');
  
  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Manejar cancelación de evento
  const handleCancelRegistration = () => {
    // En una aplicación real, esto enviaría datos al servidor
    console.log(`Cancelando registro para: ${selectedEvent.nombre}`);
    
    // Cerrar el modal después de la cancelación
    setShowCancelModal(false);
    setSelectedEvent(null);
    
    // Mostrar confirmación al usuario
    alert(`Has cancelado tu inscripción al evento "${selectedEvent.nombre}". En una aplicación real, esta información se enviaría al servidor.`);
  };

  // Manejar descarga de certificado
  const handleDownloadCertificate = (evento) => {
    // En una aplicación real, esto descargaría el certificado
    console.log(`Descargando certificado para: ${evento.nombre}`);
    alert(`Descargando certificado de "${evento.nombre}". En una aplicación real, esta acción descargaría el PDF del certificado.`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Versión reducida para la página de eventos registrados */}
      <div className="bg-green-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Mis Eventos Registrados</h1>
          <p className="opacity-90">
            Gestiona tus inscripciones a eventos y descarga tus certificados
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Resumen de Eventos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/4 pr-0 md:pr-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de Eventos</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-100 text-blue-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Eventos Registrados</p>
                        <p className="text-2xl font-bold">{eventosRegistrados.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 text-green-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Eventos Completados</p>
                        <p className="text-2xl font-bold">{eventosCompletados.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Horas Acumuladas</p>
                        <p className="text-2xl font-bold">{todosEventos.reduce((acc, evento) => acc + (evento.estado === 'Completado' ? evento.horas : 0), 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Recuerda que debes confirmar tu asistencia a los eventos para recibir tus horas libres. Si no puedes asistir a un evento, por favor cancela tu inscripción con al menos 24 horas de anticipación.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/4 mt-6 md:mt-0">
                <div className="bg-green-50 rounded-lg p-6 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-3xl font-bold text-green-700">{estudiante.horasLibres}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Horas Acumuladas</h3>
                    <p className="text-sm text-gray-600 mb-3">De 60 horas requeridas</p>
                    <Link 
                      to="/eventos-disponibles"
                      className="inline-block bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2 px-4 rounded transition duration-300 w-full"
                    >
                      Inscribirme a Eventos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Buscador y filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="md:w-1/2">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Mis Eventos</h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar en mis eventos..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="md:w-1/2 md:text-right">
                <Link 
                  to="/eventos-disponibles" 
                  className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Ver Eventos Disponibles
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tabs de navegación */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200 px-6">
              <nav className="flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('proximos')} 
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'proximos' 
                      ? 'border-green-700 text-green-700' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Próximos Eventos
                </button>
                
                <button
                  onClick={() => setActiveTab('completados')} 
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'completados' 
                      ? 'border-green-700 text-green-700' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Eventos Completados
                </button>
                
                <button
                  onClick={() => setActiveTab('todos')} 
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'todos' 
                      ? 'border-green-700 text-green-700' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Todos los Eventos
                </button>
              </nav>
            </div>
            
            {/* Listado de eventos */}
            <div className="p-6">
              {currentEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentEvents.map((evento) => (
                    <div key={evento.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">{evento.nombre}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            evento.estado === 'Completado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {evento.estado}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {formatDate(evento.fecha)}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {evento.lugar}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {evento.horas} horas {evento.estado === 'Completado' ? 'acreditadas' : 'al completar'}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {evento.descripcion}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedEvent(evento);
                              setShowDetailsModal(true);
                            }}
                            className="text-green-700 hover:text-green-800 text-sm font-medium inline-flex items-center"
                          >
                            Ver detalles
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </button>
                          
                          <div className="flex gap-2">
                            {evento.estado === 'Próximo' && (
                              <button 
                                onClick={() => {
                                  setSelectedEvent(evento);
                                  setShowCancelModal(true);
                                }}
                                className="text-red-700 hover:text-red-800 text-sm font-medium py-1 px-3 border border-red-300 rounded hover:bg-red-50 transition duration-300"
                              >
                                Cancelar
                              </button>
                            )}
                            
                            {evento.estado === 'Completado' && evento.certificado && (
                              <button 
                                onClick={() => handleDownloadCertificate(evento)}
                                className="text-white bg-green-700 hover:bg-green-800 text-sm font-medium py-1 px-3 rounded transition duration-300"
                              >
                                Certificado
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay eventos en esta categoría</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === 'proximos' 
                      ? 'No tienes eventos próximos registrados.' 
                      : activeTab === 'completados'
                        ? 'No has completado ningún evento todavía.'
                        : 'No tienes eventos registrados.'}
                  </p>
                  <div className="mt-6">
                    <Link 
                      to="/eventos-disponibles"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Ver eventos disponibles
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Guía de certificaciones */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Guía para Certificación de Horas</h3>
            
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
                    <p>Para obtener la certificación de horas libres, debes asistir al evento completo y registrar tu asistencia al inicio y al final del mismo.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">1</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-md font-medium text-gray-800">Inscripción al Evento</h4>
                  <p className="mt-1 text-sm text-gray-600">Regístrate en los eventos a través del portal estudiantil. Recibirás una confirmación por correo electrónico.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">2</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-md font-medium text-gray-800">Asistencia al Evento</h4>
                  <p className="mt-1 text-sm text-gray-600">Asiste al evento y registra tu entrada y salida con el código QR o a través del personal encargado.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">3</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-md font-medium text-gray-800">Verificación</h4>
                  <p className="mt-1 text-sm text-gray-600">El organizador del evento verificará tu asistencia dentro de los 3 días hábiles siguientes al evento.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">4</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-md font-medium text-gray-800">Certificación</h4>
                  <p className="mt-1 text-sm text-gray-600">Una vez verificada tu asistencia, podrás descargar el certificado desde la sección "Eventos Completados".</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enlaces Rápidos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                to="/horas-libres"
                className="bg-green-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 className="font-semibold text-center">Horas Libres</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver mi progreso</p>
              </Link>
              
              <Link 
                to="/eventos-disponibles"
                className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h4 className="font-semibold text-center">Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver eventos disponibles</p>
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
              
              <Link 
                to="/"
                className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <h4 className="font-semibold text-center">Inicio</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Volver a inicio</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de detalles del evento */}
      {selectedEvent && showDetailsModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.nombre}</h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4">
                    {/* Aquí iría la imagen real del evento */}
                    <div className={`w-full h-full flex items-center justify-center rounded-lg ${selectedEvent.id % 3 === 0 ? 'bg-blue-100' : selectedEvent.id % 3 === 1 ? 'bg-green-100' : 'bg-purple-100'}`}>
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                  <p className="text-gray-600 mb-6">{selectedEvent.descripcion}</p>
                  
                  {selectedEvent.estado === 'Próximo' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm leading-5 font-medium text-yellow-800">Recordatorio</h4>
                          <div className="mt-1 text-sm leading-5 text-yellow-700">
                            <p>
                              Recuerda llegar 15 minutos antes del inicio del evento para registrar tu asistencia. Si no puedes asistir, por favor cancela tu inscripción con al menos 24 horas de anticipación.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.estado === 'Completado' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm leading-5 font-medium text-green-800">Evento Completado</h4>
                          <div className="mt-1 text-sm leading-5 text-green-700">
                            <p>
                              Has completado este evento con éxito. Las horas han sido acreditadas a tu cuenta.
                              {selectedEvent.certificado && ' Puedes descargar tu certificado desde esta página.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    {selectedEvent.estado === 'Próximo' && (
                      <button 
                        onClick={() => {
                          setShowDetailsModal(false);
                          setShowCancelModal(true);
                        }}
                        className="inline-block text-white bg-red-600 hover:bg-red-700 font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Cancelar Inscripción
                      </button>
                    )}
                    
                    {selectedEvent.estado === 'Completado' && selectedEvent.certificado && (
                      <button 
                        onClick={() => handleDownloadCertificate(selectedEvent)}
                        className="inline-block text-white bg-green-700 hover:bg-green-800 font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Descargar Certificado
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Evento</h3>
                  
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Estado</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedEvent.estado === 'Completado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedEvent.estado}
                        </span>
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Categoría</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {selectedEvent.categoria}
                        </span>
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(selectedEvent.fecha)}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Lugar</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedEvent.lugar}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Horas acreditables</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedEvent.horas} horas</dd>
                    </div>
                    
                    {selectedEvent.estado === 'Completado' && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Asistencia</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {selectedEvent.asistencia}
                          </span>
                        </dd>
                      </div>
                    )}
                  </dl>
                  
                  {selectedEvent.estado === 'Próximo' && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Instrucciones:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Llega 15 minutos antes para registrar tu entrada.</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Lleva tu carné estudiantil para la verificación.</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Registra tu salida al finalizar el evento.</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de cancelación de inscripción */}
      {selectedEvent && showCancelModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Cancelar Inscripción</h2>
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                  ¿Estás seguro de cancelar tu inscripción?
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Estás a punto de cancelar tu inscripción a <span className="font-medium">{selectedEvent.nombre}</span>. Esta acción no se puede deshacer.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Si cancelas tu inscripción a menos de 24 horas del evento, esto podría afectar tu prioridad en futuras inscripciones.
                      </p>
                    </div>
                  </div>
                </div>
                
                <form>
                  <div className="mb-4">
                    <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-1">
                      Motivo de la cancelación (opcional)
                    </label>
                    <select
                      id="motivo"
                      name="motivo"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Selecciona un motivo</option>
                      <option value="horario">Conflicto de horario</option>
                      <option value="personal">Motivo personal</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-1">
                      Comentarios adicionales (opcional)
                    </label>
                    <textarea
                      id="comentarios"
                      name="comentarios"
                      rows="3"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Si deseas, puedes proporcionar más detalles sobre tu cancelación."
                    ></textarea>
                  </div>
                </form>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Volver
                </button>
                <button 
                  onClick={handleCancelRegistration}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Confirmar Cancelación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventosRegistrados;