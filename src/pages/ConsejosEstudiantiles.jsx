import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { consejos, categorias, programasAcademicos } from '../data/consejos';

const ConsejosEstudiantiles = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrograma, setSelectedPrograma] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState('recientes');

  // Estado para el formulario de nuevo consejo
  const [nuevoConsejo, setNuevoConsejo] = useState({
    titulo: '',
    contenido: '',
    autor: '',
    programa: '',
    semestre: '',
    categoria: 'estudio',
    tags: ''
  });

  // Filtrar consejos según criterios
  const filteredConsejos = consejos.filter(consejo => {
    const matchesSearch = consejo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         consejo.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consejo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeTab === 'todos' || consejo.categoria.toLowerCase() === activeTab;
    
    const matchesPrograma = selectedPrograma === '' || consejo.programa === selectedPrograma;
    
    return matchesSearch && matchesCategory && matchesPrograma;
  });

  // Ordenar consejos
  const sortedConsejos = [...filteredConsejos].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return b.likes - a.likes;
      case 'alfabetico':
        return a.titulo.localeCompare(b.titulo);
      case 'recientes':
      default:
        return new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion);
    }
  });

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Manejar envío del formulario de nuevo consejo
  const handleSubmitConsejo = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar al servidor
    console.log('Nuevo consejo:', nuevoConsejo);
    
    // Resetear formulario y cerrar modal
    setNuevoConsejo({
      titulo: '',
      contenido: '',
      autor: '',
      programa: '',
      semestre: '',
      categoria: 'estudio',
      tags: ''
    });
    setShowAddModal(false);
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por compartir tu consejo! Será revisado y publicado pronto.');
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoConsejo({
      ...nuevoConsejo,
      [name]: value
    });
  };

  // Obtener categoría por ID
  const getCategoriaById = (id) => {
    return categorias.find(cat => cat.id === id.toLowerCase()) || categorias[0];
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-green-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Consejos Estudiantiles</h1>
          <p className="opacity-90">
            Descubre tips y recomendaciones compartidos por estudiantes para mejorar tu vida universitaria
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Estadísticas rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">{consejos.length}</div>
                <div className="text-gray-600">Consejos compartidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">{new Set(consejos.map(c => c.programa)).size}</div>
                <div className="text-gray-600">Programas representados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{consejos.reduce((sum, c) => sum + c.likes, 0)}</div>
                <div className="text-gray-600">Likes totales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-700">{categorias.length - 1}</div>
                <div className="text-gray-600">Categorías disponibles</div>
              </div>
            </div>
          </div>
          
          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="md:w-1/2">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Buscar Consejos</h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar por título, contenido o tags..." 
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
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Compartir mi consejo
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="programa" className="block text-sm font-medium text-gray-700 mb-1">Programa</label>
                <select 
                  id="programa" 
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={selectedPrograma}
                  onChange={(e) => setSelectedPrograma(e.target.value)}
                >
                  <option value="">Todos los programas</option>
                  {programasAcademicos.map((programa, idx) => (
                    <option key={idx} value={programa}>{programa}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                <select 
                  id="sortBy" 
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recientes">Más recientes</option>
                  <option value="likes">Más populares</option>
                  <option value="alfabetico">Alfabético</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPrograma('');
                    setActiveTab('todos');
                    setSortBy('recientes');
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded transition duration-300"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs de categorías */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200 px-6">
              <nav className="flex space-x-8 overflow-x-auto">
                {categorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setActiveTab(categoria.id)} 
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
                      activeTab === categoria.id 
                        ? 'border-green-700 text-green-700' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{categoria.icono}</span>
                    {categoria.nombre}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Listado de consejos */}
            <div className="p-6">
              {sortedConsejos.length > 0 ? (
                <div className="space-y-6">
                  {sortedConsejos.map((consejo) => {
                    const categoria = getCategoriaById(consejo.categoria);
                    return (
                      <div key={consejo.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">{consejo.titulo}</h3>
                                {consejo.verificado && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verificado
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600 mb-3">
                                <div className="flex items-center mr-4">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                  </svg>
                                  {consejo.autor}
                                </div>
                                <div className="flex items-center mr-4">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                  </svg>
                                  {consejo.programa}
                                </div>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                  {formatDate(consejo.fechaPublicacion)}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoria.color}`}>
                                {categoria.icono} {categoria.nombre}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {consejo.contenido}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {consejo.tags.map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-700 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <span>{consejo.likes}</span>
                              </button>
                              
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-700 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                </svg>
                                <span>Compartir</span>
                              </button>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              Semestre {consejo.semestre}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron consejos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No hemos encontrado consejos que coincidan con tus criterios de búsqueda.
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Sé el primero en compartir
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Llamada a la acción */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Tienes un consejo que compartir?</h3>
              <p className="text-gray-600 mb-4">
                Ayuda a otros estudiantes compartiendo tus experiencias y tips universitarios
              </p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                Compartir mi consejo
              </button>
            </div>
          </div>
          
          {/* Enlaces Rápidos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                to="/eventos-disponibles"
                className="bg-green-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h4 className="font-semibold text-center">Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver eventos disponibles</p>
              </Link>
              
              <Link 
                to="/horas-libres"
                className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 className="font-semibold text-center">Horas Libres</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver mi progreso</p>
              </Link>
              
              <Link 
                to="/perfil"
                className="bg-purple-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <h4 className="font-semibold text-center">Mi Perfil</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Ver mi información</p>
              </Link>
              
              <Link 
                to="/"
                className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <h4 className="font-semibold text-center">Inicio</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Volver a inicio</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para agregar nuevo consejo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Compartir mi consejo</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmitConsejo}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                      Título del consejo *
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      required
                      value={nuevoConsejo.titulo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Ej: Cómo organizar mejor tu tiempo de estudio"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-1">
                      Contenido del consejo *
                    </label>
                    <textarea
                      id="contenido"
                      name="contenido"
                      required
                      rows="4"
                      value={nuevoConsejo.contenido}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Comparte tu experiencia y consejos detallados..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-1">
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        id="autor"
                        name="autor"
                        required
                        value={nuevoConsejo.autor}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="programa" className="block text-sm font-medium text-gray-700 mb-1">
                        Programa académico *
                      </label>
                      <select
                        id="programa"
                        name="programa"
                        required
                        value={nuevoConsejo.programa}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Selecciona tu programa</option>
                        {programasAcademicos.map((programa, idx) => (
                          <option key={idx} value={programa}>{programa}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="semestre" className="block text-sm font-medium text-gray-700 mb-1">
                        Semestre actual *
                      </label>
                      <select
                        id="semestre"
                        name="semestre"
                        required
                        value={nuevoConsejo.semestre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Selecciona tu semestre</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría *
                      </label>
                      <select
                        id="categoria"
                        name="categoria"
                        required
                        value={nuevoConsejo.categoria}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        {categorias.slice(1).map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.icono} {categoria.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (separados por comas)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={nuevoConsejo.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="productividad, organización, tiempo"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Agrega palabras clave que ayuden a otros estudiantes a encontrar tu consejo
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Compartir consejo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsejosEstudiantiles;