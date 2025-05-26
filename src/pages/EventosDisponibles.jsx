import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { estudiante } from '../data/estudiante';

const EventosDisponibles = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [filters, setFilters] = useState({
    categoria: 'todas',
    fecha: '',
    horasMin: '',
    horasMax: ''
  });
  
  // Eventos disponibles (similar a los que se utilizan en EventsPreview.jsx)
  const eventos = [
    { 
      id: 1, 
      nombre: "IngeniOTIC 2025", 
      fecha: "2025-06-15",
      descripcion: "Evento de innovación tecnológica organizado por la facultad de Ingeniería. IngeniOTIC reúne a estudiantes, profesores y profesionales del sector para presentar proyectos y avances en Internet de las Cosas, Inteligencia Artificial y otras tecnologías emergentes.",
      imagen: "/assets/ingeniotic.jpg",
      horas: 8,
      lugar: "Auditorio Mayor",
      categoria: "Académico",
      organizador: "Facultad de Ingeniería",
      cupos: 150,
      cuposDisponibles: 87,
      requisitos: "Estudiantes de cualquier programa académico pueden participar.",
      contacto: "ingeniotic@unab.edu.co"
    },
    { 
      id: 2, 
      nombre: "UNAB Fest", 
      fecha: "2025-05-28",
      descripcion: "Festival cultural con actividades artísticas y musicales para toda la comunidad universitaria. UNAB Fest incluye presentaciones de bandas, grupos de danza, exposiciones de arte, talleres y muchas actividades para fomentar la integración y el bienestar estudiantil.",
      imagen: "/assets/unabfest.jpg",
      horas: 6,
      lugar: "Campus El Jardín",
      categoria: "Cultural",
      organizador: "Bienestar Universitario",
      cupos: 200,
      cuposDisponibles: 132,
      requisitos: "Abierto a toda la comunidad universitaria.",
      contacto: "bienestar@unab.edu.co"
    },
    { 
      id: 3, 
      nombre: "Semana de Ingeniería", 
      fecha: "2025-07-10",
      descripcion: "Conferencias, talleres y competencias organizadas por la facultad de Ingeniería. Durante una semana completa, los estudiantes podrán participar en actividades académicas, conocer los últimos avances tecnológicos y networking con empresas del sector.",
      imagen: "/assets/semana-ingenieria.jpg",
      horas: 10,
      lugar: "Bloque D",
      categoria: "Académico",
      organizador: "Facultad de Ingeniería",
      cupos: 180,
      cuposDisponibles: 180,
      requisitos: "Prioridad para estudiantes de Ingeniería, pero abierto a todos los programas.",
      contacto: "ingenieria@unab.edu.co"
    },
    { 
      id: 4, 
      nombre: "ULIBRO 2025", 
      fecha: "2025-08-20",
      descripcion: "Feria del libro con presentaciones de autores nacionales e internacionales. ULIBRO es el evento cultural más importante de la región, con charlas, talleres literarios, presentaciones de libros, firmas con autores y actividades para todas las edades.",
      imagen: "/assets/ulibro.jpg",
      horas: 5,
      lugar: "Centro de Convenciones Neomundo",
      categoria: "Cultural",
      organizador: "Departamento de Humanidades",
      cupos: 300,
      cuposDisponibles: 245,
      requisitos: "Abierto a toda la comunidad universitaria y público en general.",
      contacto: "ulibro@unab.edu.co"
    },
    {
      id: 5,
      nombre: "Voluntariado Comunitario",
      fecha: "2025-06-05",
      descripcion: "Programa de voluntariado en comunidades vulnerables de la región. Los estudiantes podrán participar en proyectos de impacto social, aportando sus conocimientos y habilidades para ayudar a comunidades necesitadas.",
      imagen: "voluntariado.jpg",
      horas: 20,
      lugar: "Varios lugares",
      categoria: "Social",
      organizador: "Proyección Social UNAB",
      cupos: 50,
      cuposDisponibles: 32,
      requisitos: "Requiere compromiso de asistencia a todas las jornadas programadas.",
      contacto: "voluntariado@unab.edu.co"
    },
    {
      id: 6,
      nombre: "Congreso Internacional de Ciencias de la Salud",
      fecha: "2025-09-12",
      descripcion: "Congreso académico con ponentes internacionales sobre avances en medicina, enfermería y salud pública. Una oportunidad única para actualizar conocimientos y establecer contactos con profesionales del sector.",
      imagen: "congreso-salud.jpg",
      horas: 15,
      lugar: "Auditorio Menor",
      categoria: "Académico",
      organizador: "Facultad de Ciencias de la Salud",
      cupos: 120,
      cuposDisponibles: 120,
      requisitos: "Prioridad para estudiantes de Ciencias de la Salud, pero abierto a todos los programas.",
      contacto: "congresosalud@unab.edu.co"
    },
    {
      id: 7,
      nombre: "Torneo Deportivo Interfacultades",
      fecha: "2025-06-20",
      descripcion: "Competencias deportivas entre las diferentes facultades de la universidad. Las disciplinas incluyen fútbol, baloncesto, voleibol, ajedrez y atletismo. Es una excelente oportunidad para promover el deporte y la integración entre estudiantes.",
      imagen: "torneo-deportivo.jpg",
      horas: 12,
      lugar: "Coliseo y Canchas Deportivas",
      categoria: "Deportivo",
      organizador: "Bienestar Universitario - Área de Deportes",
      cupos: 200,
      cuposDisponibles: 157,
      requisitos: "Cada facultad debe inscribir sus equipos. También se puede participar como asistente.",
      contacto: "deportes@unab.edu.co"
    },
    {
      id: 8,
      nombre: "Seminario de Emprendimiento e Innovación",
      fecha: "2025-07-25",
      descripcion: "Seminario sobre herramientas y estrategias para emprendedores. Incluye talleres prácticos, charlas de emprendedores exitosos y asesorías para proyectos de emprendimiento de los estudiantes.",
      imagen: "seminario-emprendimiento.jpg",
      horas: 8,
      lugar: "Centro de Innovación UNAB",
      categoria: "Académico",
      organizador: "UNAB Creative",
      cupos: 80,
      cuposDisponibles: 65,
      requisitos: "Abierto a estudiantes de todos los programas académicos.",
      contacto: "emprendimiento@unab.edu.co"
    }
  ];

  // Eventos ya registrados por el estudiante (desde data/estudiante.js)
  const eventosRegistrados = estudiante.eventosRegistrados || [];
  const eventosRegistradosIds = eventosRegistrados.map(e => e.id);
  
  // Comprobar si hay un ID de evento en los parámetros de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get('id');
    const register = searchParams.get('register');
    
    if (eventId) {
      const evento = eventos.find(e => e.id === parseInt(eventId));
      if (evento) {
        setSelectedEvent(evento);
        if (register === 'true') {
          setShowRegisterModal(true);
        }
      }
    }
  }, [location]);

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Filtrar eventos según criterios
  const filteredEventos = eventos.filter(evento => {
    const matchesSearch = evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.categoria === 'todas' || evento.categoria === filters.categoria;
    
    const matchesDate = !filters.fecha || evento.fecha >= filters.fecha;
    
    const matchesHoursMin = !filters.horasMin || evento.horas >= parseInt(filters.horasMin);
    const matchesHoursMax = !filters.horasMax || evento.horas <= parseInt(filters.horasMax);
    
    return matchesSearch && matchesCategory && matchesDate && matchesHoursMin && matchesHoursMax;
  });

  // Agrupar eventos por categoría
  const categorias = [...new Set(eventos.map(evento => evento.categoria))];
  
  // Eventos según la tab activa
  const currentEvents = activeTab === 'todos' 
    ? filteredEventos 
    : filteredEventos.filter(evento => evento.categoria.toLowerCase() === activeTab.toLowerCase());

  // Manejar registro de evento (aquí se implementaría la lógica real)
  const handleRegister = (evento) => {
    // En una aplicación real, esto enviaría datos al servidor
    console.log(`Registrado para: ${evento.nombre}`);
    
    // Cerrar el modal después del registro
    setShowRegisterModal(false);
    setSelectedEvent(null);
    
    // Redirigir a la página de EventosRegistrados
    // En una app real usaríamos history.push o navegación programática
    alert(`¡Te has registrado exitosamente en el evento "${evento.nombre}"!`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Versión reducida para la página de eventos */}
      <div className="bg-[#3d3dea] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Eventos Disponibles</h1>
          <p className="opacity-90">
            Explora y regístrate en eventos para acumular horas libres
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Buscador y filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="md:w-1/2">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Buscar Eventos</h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre o descripción..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d3dea] focus:border-[#3d3dea]"
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
                  to="/eventos-registrados" 
                  className="inline-block bg-[#3d3dea] hover:bg-[#2d2dd4] text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Ver Mis Eventos Registrados
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select 
                  id="categoria" 
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm rounded-md"
                  value={filters.categoria}
                  onChange={(e) => setFilters({...filters, categoria: e.target.value})}
                >
                  <option value="todas">Todas las categorías</option>
                  {categorias.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
                <input 
                  type="date" 
                  id="fecha" 
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm rounded-md"
                  value={filters.fecha}
                  onChange={(e) => setFilters({...filters, fecha: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="horasMin" className="block text-sm font-medium text-gray-700 mb-1">Horas mínimas</label>
                <input 
                  type="number" 
                  id="horasMin" 
                  min="0" 
                  placeholder="Min. horas"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm rounded-md"
                  value={filters.horasMin}
                  onChange={(e) => setFilters({...filters, horasMin: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="horasMax" className="block text-sm font-medium text-gray-700 mb-1">Horas máximas</label>
                <input 
                  type="number" 
                  id="horasMax" 
                  min="0"
                  placeholder="Max. horas"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3d3dea] focus:border-[#3d3dea] sm:text-sm rounded-md"
                  value={filters.horasMax}
                  onChange={(e) => setFilters({...filters, horasMax: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          {/* Tabs de categorías */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200 px-6">
              <nav className="flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('todos')} 
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'todos' 
                      ? 'border-[#3d3dea] text-[#3d3dea]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Todos los eventos
                </button>
                
                {categorias.map((categoria, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(categoria.toLowerCase())} 
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === categoria.toLowerCase() 
                        ? 'border-[#3d3dea] text-[#3d3dea]' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Listado de eventos */}
            <div className="p-6">
              {currentEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentEvents.map((evento) => {
                    const isRegistered = eventosRegistradosIds.includes(evento.id);
                    return (
                      <div key={evento.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                          {/* Aquí iría la imagen real del evento */}
                          <div className={`w-full h-full flex items-center justify-center ${evento.id % 3 === 0 ? 'bg-blue-100' : evento.id % 3 === 1 ? 'bg-[#3d3dea]/10' : 'bg-purple-100'}`}>
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                          </div>
                          
                          {/* Badge de categoría */}
                          <span className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                            evento.categoria === 'Académico' ? 'bg-blue-100 text-blue-800' :
                            evento.categoria === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                            evento.categoria === 'Deportivo' ? 'bg-red-100 text-red-800' :
                            'bg-[#3d3dea]/10 text-[#3d3dea]'
                          }`}>
                            {evento.categoria}
                          </span>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">{evento.nombre}</h3>
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
                          
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {evento.descripcion}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <button 
                              onClick={() => {
                                setSelectedEvent(evento);
                                setShowRegisterModal(false);
                              }}
                              className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                            >
                              Más información
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </button>
                            
                            {isRegistered ? (
                              <Link
                                to="/eventos-registrados"
                                className="text-white bg-gray-500 text-sm font-medium py-1 px-3 rounded transition duration-300 cursor-not-allowed"
                              >
                                Ya inscrito
                              </Link>
                            ) : (
                              <button 
                                onClick={() => {
                                  setSelectedEvent(evento);
                                  setShowRegisterModal(true);
                                }}
                                className="text-white bg-[#3d3dea] hover:bg-[#2d2dd4] text-sm font-medium py-1 px-3 rounded transition duration-300"
                              >
                                Inscribirme
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay eventos disponibles</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No hemos encontrado eventos que coincidan con tus criterios de búsqueda.
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({
                          categoria: 'todas',
                          fecha: '',
                          horasMin: '',
                          horasMax: ''
                        });
                        setActiveTab('todos');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3d3dea] hover:bg-[#2d2dd4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d3dea]"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Acciones adicionales */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">¿Organizas un evento?</h3>
            <p className="text-gray-600 mb-4">
              Si eres organizador de eventos o representante estudiantil, puedes solicitar la aprobación de horas libres para tu evento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/solicitar-evento" 
                className="inline-block text-center bg-[#3d3dea] hover:bg-[#2d2dd4] text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Solicitar aprobación de evento
              </Link>
              <a 
                href="#" 
                className="inline-block text-center border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded transition duration-300"
              >
                Consultar requisitos
              </a>
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
                to="/eventos-registrados"
                className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
                <h4 className="font-semibold text-center">Mis Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver eventos registrados</p>
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
      {selectedEvent && !showRegisterModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.nombre}</h2>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="h-64 bg-gray-200 rounded-lg mb-4">
                    {/* Aquí iría la imagen real del evento */}
                    <div className={`w-full h-full flex items-center justify-center rounded-lg ${selectedEvent.id % 3 === 0 ? 'bg-blue-100' : selectedEvent.id % 3 === 1 ? 'bg-[#3d3dea]/10' : 'bg-purple-100'}`}>
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                  <p className="text-gray-600 mb-6">{selectedEvent.descripcion}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Requisitos</h3>
                  <p className="text-gray-600 mb-6">{selectedEvent.requisitos}</p>
                  
                  <div className="flex justify-end">
                    {eventosRegistradosIds.includes(selectedEvent.id) ? (
                      <Link
                        to="/eventos-registrados"
                        className="inline-block text-white bg-gray-500 font-medium py-2 px-4 rounded transition duration-300 cursor-not-allowed mr-4"
                      >
                        Ya inscrito
                      </Link>
                    ) : (
                      <button 
                        onClick={() => setShowRegisterModal(true)}
                        className="inline-block text-white bg-[#3d3dea] hover:bg-[#2d2dd4] font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Inscribirme
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Evento</h3>
                  
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Categoría</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedEvent.categoria === 'Académico' ? 'bg-blue-100 text-blue-800' :
                          selectedEvent.categoria === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                          selectedEvent.categoria === 'Deportivo' ? 'bg-red-100 text-red-800' :
                          'bg-[#3d3dea]/10 text-[#3d3dea]'
                        }`}>
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
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Organizador</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedEvent.organizador}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Cupos disponibles</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedEvent.cuposDisponibles} de {selectedEvent.cupos}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contacto</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedEvent.contacto}</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-[#3d3dea] h-2.5 rounded-full" 
                        style={{ width: `${Math.round((selectedEvent.cuposDisponibles / selectedEvent.cupos) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                      {Math.round((selectedEvent.cuposDisponibles / selectedEvent.cupos) * 100)}% de cupos disponibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de registro para el evento */}
      {selectedEvent && showRegisterModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Inscripción al Evento</h2>
                <button 
                  onClick={() => setShowRegisterModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">{selectedEvent.nombre}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {formatDate(selectedEvent.fecha)}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {selectedEvent.lugar}
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm leading-5 font-medium text-yellow-800">Importante</h4>
                      <div className="mt-1 text-sm leading-5 text-yellow-700">
                        <p>
                          Al registrarte en este evento, te comprometes a asistir. Si no puedes asistir, por favor cancela tu inscripción con al menos 24 horas de anticipación.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <form>
                  <div className="mb-4">
                    <label htmlFor="terminos" className="flex items-start">
                      <input
                        id="terminos"
                        name="terminos"
                        type="checkbox"
                        className="h-4 w-4 text-[#3d3dea] focus:ring-[#3d3dea] border-gray-300 rounded mt-1"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Acepto los términos y condiciones de participación en el evento y me comprometo a asistir. Entiendo que mi asistencia será verificada para la acreditación de horas libres.
                      </span>
                    </label>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-1">
                      Comentarios o necesidades especiales (opcional)
                    </label>
                    <textarea
                      id="comentarios"
                      name="comentarios"
                      rows="3"
                      className="shadow-sm focus:ring-[#3d3dea] focus:border-[#3d3dea] block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Indícanos si tienes alguna necesidad especial o comentario para los organizadores."
                    ></textarea>
                  </div>
                </form>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setShowRegisterModal(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d3dea]"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => handleRegister(selectedEvent)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3d3dea] hover:bg-[#2d2dd4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d3dea]"
                >
                  Confirmar Inscripción
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventosDisponibles;