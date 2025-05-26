import React, { useState } from 'react';
import { estudiante } from '../data/estudiante';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Usando los datos de estudiante.js
  const { nombre, semestre, cursos, horasLibres, eventosRegistrados } = estudiante;
  
  // Información complementaria que sería parte de un perfil completo
  const informacionPersonal = {
    nombreCompleto: nombre, // Usando el nombre del archivo estudiante.js
    documento: "1098765432",
    email: `${nombre.toLowerCase().replace(/\s+/g, '.')}@unab.edu.co`,
    telefono: "+57 321 456 7890",
    fechaNacimiento: "1999-05-12",
    programa: "Ingeniería de Sistemas",
    facultad: "Facultad de Ingeniería",
    estado: "Activo",
    modalidad: "Presencial"
  };
  
  const informacionAcademica = {
    promedio: 4.2,
    creditos: {
      cursados: 76,
      aprobados: 72,
      totales: 160
    },
    horario: [
      { dia: "Lunes", materia: "Álgebra Lineal", horario: "7:00 - 9:00", salon: "D1-301" },
      { dia: "Lunes", materia: "Programación II", horario: "9:00 - 11:00", salon: "D5-202" },
      { dia: "Miércoles", materia: "Álgebra Lineal", horario: "7:00 - 9:00", salon: "D1-301" },
      { dia: "Miércoles", materia: "Estadística", horario: "9:00 - 11:00", salon: "D3-401" },
      { dia: "Viernes", materia: "Programación II", horario: "7:00 - 9:00", salon: "D5-202" },
      { dia: "Viernes", materia: "Estadística", horario: "11:00 - 13:00", salon: "D3-401" }
    ],
    notas: [
      { curso: "Cálculo I", nota: 4.5, creditos: 4, semestre: "2024-1" },
      { curso: "Fundamentos de Programación", nota: 4.8, creditos: 4, semestre: "2024-1" },
      { curso: "Física I", nota: 3.9, creditos: 4, semestre: "2024-1" },
      { curso: "Matemáticas Discretas", nota: 4.0, creditos: 3, semestre: "2024-1" },
      { curso: "Cálculo II", nota: 4.2, creditos: 4, semestre: "2024-2" },
      { curso: "Programación I", nota: 4.6, creditos: 4, semestre: "2024-2" },
      { curso: "Física II", nota: 3.7, creditos: 4, semestre: "2024-2" }
    ]
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Actualizado con el nuevo color */}
      <div className="bg-[#3d3dea] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
          <p className="opacity-90">
            Gestiona tu información académica y personal
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Perfil General */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Foto y acciones rápidas */}
              <div className="md:w-1/4">
                <div className="flex flex-col items-center">
                  {/* Avatar/Foto - Actualizado al nuevo color */}
                  <div className="h-32 w-32 rounded-full bg-[#3d3dea]/10 flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-[#3d3dea]">{nombre.charAt(0)}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-1">{nombre}</h2>
                  <p className="text-gray-600 mb-4 text-center">Semestre {semestre} • {informacionPersonal.programa}</p>
                  
                  <div className="w-full space-y-2">
                    <Link to="/perfil/editar" className="w-full block text-center bg-[#3d3dea] hover:bg-[#2d2dd4] text-white rounded-lg py-2 px-4 transition duration-300">
                      Editar Perfil
                    </Link>
                    <Link to="/cambiar-contrasena" className="w-full block text-center border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg py-2 px-4 transition duration-300">
                      Cambiar Contraseña
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Información principal y tabs */}
              <div className="md:w-3/4">
                {/* Tabs de navegación - Actualizados al nuevo color */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('general')} 
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'general' 
                          ? 'border-[#3d3dea] text-[#3d3dea]' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Información General
                    </button>
                    <button
                      onClick={() => setActiveTab('academica')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'academica' 
                          ? 'border-[#3d3dea] text-[#3d3dea]' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Información Académica
                    </button>
                    <button
                      onClick={() => setActiveTab('eventos')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'eventos' 
                          ? 'border-[#3d3dea] text-[#3d3dea]' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Eventos y Actividades
                    </button>
                  </nav>
                </div>
                
                {/* Contenido de las tabs */}
                <div className="pb-4">
                  {/* Tab: Información General */}
                  {activeTab === 'general' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Nombre Completo</p>
                          <p className="font-medium">{informacionPersonal.nombreCompleto}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Documento</p>
                          <p className="font-medium">{informacionPersonal.documento}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Correo Electrónico</p>
                          <p className="font-medium">{informacionPersonal.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-medium">{informacionPersonal.telefono}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                          <p className="font-medium">{formatDate(informacionPersonal.fechaNacimiento)}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Programa</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Programa</p>
                          <p className="font-medium">{informacionPersonal.programa}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Facultad</p>
                          <p className="font-medium">{informacionPersonal.facultad}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estado</p>
                          <p className="font-medium">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3d3dea]/10 text-[#3d3dea]">
                              {informacionPersonal.estado}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Modalidad</p>
                          <p className="font-medium">{informacionPersonal.modalidad}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Semestre Actual</p>
                          <p className="font-medium">{semestre}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tab: Información Académica */}
                  {activeTab === 'academica' && (
                    <div>
                      {/* Resumen académico */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen Académico</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Promedio Acumulado</p>
                            <p className="text-3xl font-bold text-blue-700">{informacionAcademica.promedio.toFixed(1)}</p>
                          </div>
                          <div className="bg-[#3d3dea]/10 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Créditos Aprobados</p>
                            <p className="text-3xl font-bold text-[#3d3dea]">
                              {informacionAcademica.creditos.aprobados}/{informacionAcademica.creditos.totales}
                            </p>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Progreso de Carrera</p>
                            <p className="text-3xl font-bold text-yellow-700">
                              {Math.round((informacionAcademica.creditos.aprobados / informacionAcademica.creditos.totales) * 100)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Materias actuales */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Materias Actuales</h3>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <ul className="divide-y divide-gray-200">
                            {cursos.map((curso, index) => (
                              <li key={index} className="p-4 hover:bg-gray-50 transition">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium text-gray-800">{curso}</h4>
                                  </div>
                                  <Link 
                                    to={`/curso/${curso.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                                  >
                                    Ver detalles
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                  </Link>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Horario semanal */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Horario Semanal</h3>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Día</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salón</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {informacionAcademica.horario.map((clase, index) => (
                                  <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{clase.dia}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{clase.materia}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{clase.horario}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{clase.salon}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      
                      {/* Historial de notas */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Notas</h3>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {informacionAcademica.notas.map((curso, index) => (
                                  <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{curso.curso}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                      curso.nota >= 4.0 ? 'text-[#3d3dea]' : curso.nota >= 3.0 ? 'text-yellow-700' : 'text-red-700'
                                    }`}>
                                      {curso.nota.toFixed(1)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curso.creditos}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curso.semestre}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tab: Eventos y Actividades */}
                  {activeTab === 'eventos' && (
                    <div>
                      {/* Progreso de horas libres */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Progreso de Horas Libres</h3>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Progreso Total: {horasLibres}/60 horas
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              {Math.round((horasLibres / 60) * 100)}% Completado
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div 
                              className="bg-[#3d3dea] h-2.5 rounded-full" 
                              style={{ width: `${Math.min(100, (horasLibres / 60) * 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-[#3d3dea]/10 rounded-lg p-4 flex items-center">
                              <div className="h-10 w-10 rounded-full bg-[#3d3dea]/20 flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-[#3d3dea]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Horas Acumuladas</p>
                                <p className="text-xl font-bold text-[#3d3dea]">{horasLibres}</p>
                              </div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Horas Requeridas</p>
                                <p className="text-xl font-bold text-blue-700">60</p>
                              </div>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-4 flex items-center">
                              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Horas Faltantes</p>
                                <p className="text-xl font-bold text-yellow-700">{60 - horasLibres}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Link 
                              to="/horas-libres" 
                              className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium inline-flex items-center"
                            >
                              Ver detalles completos
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </Link>
                            <Link 
                              to="/eventos-disponibles" 
                              className="bg-[#3d3dea] hover:bg-[#2d2dd4] text-white text-sm font-medium py-2 px-4 rounded transition duration-300"
                            >
                              Ver Eventos Disponibles
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      {/* Eventos registrados */}
                      <div>
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Accesos Rápidos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="https://cosmos.unab.edu.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-purple-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <h4 className="font-semibold text-center">Portal de Notas</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Consulta tus calificaciones</p>
              </a>
              
              <a 
                href="https://aulavirtual.unab.edu.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
                <h4 className="font-semibold text-center">Aula Virtual</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Accede a tus materias</p>
              </a>
              
              <Link 
                to="/horas-libres"
                className="bg-[#3d3dea]/10 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-[#3d3dea] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 className="font-semibold text-center">Horas Libres</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Gestiona tus horas libres</p>
              </Link>
              
              <Link 
                to="/eventos-disponibles"
                className="bg-red-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-red-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
                <h4 className="font-semibold text-center">Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Eventos disponibles</p>
              </Link>
            </div>
          </div>
          
          {/* Historial de Actividades */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Actividades Recientes</h3>
            
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-[#3d3dea]/10 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-[#3d3dea]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-gray-800">Te has registrado para el evento <span className="font-medium">Hackathon UNAB</span></p>
                          <p className="mt-0.5 text-sm text-gray-500">15 de mayo de 2025 - 10:23 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-gray-800">Has recibido una notificación sobre <span className="font-medium">Inscripciones para Semestre 2025-2</span></p>
                          <p className="mt-0.5 text-sm text-gray-500">15 de mayo de 2025 - 9:15 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-[#3d3dea]/10 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-[#3d3dea]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-gray-800">Horas libres actualizadas: <span className="font-medium">+8 horas</span> por evento <span className="font-medium">Taller de Innovación</span></p>
                          <p className="mt-0.5 text-sm text-gray-500">12 de mayo de 2025 - 11:45 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative pb-0">
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-[#3d3dea]/10 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-[#3d3dea]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-gray-800">Te has registrado para el evento <span className="font-medium">Taller de Innovación</span></p>
                          <p className="mt-0.5 text-sm text-gray-500">10 de mayo de 2025 - 9:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-[#3d3dea] hover:text-[#2d2dd4] text-sm font-medium">
                Ver historial completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;