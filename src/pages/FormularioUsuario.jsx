import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormularioUsuario = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    tipoDocumento: 'cc',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    programa: '',
    facultad: '',
    semestre: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  });

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({});
  
  // Estado para mensaje de éxito
  const [successMessage, setSuccessMessage] = useState('');

  // Lista de facultades y programas disponibles
  const facultades = [
    { id: 1, nombre: 'Facultad de Ingeniería' },
    { id: 2, nombre: 'Facultad de Ciencias de la Salud' },
    { id: 3, nombre: 'Facultad de Ciencias Económicas, Administrativas y Contables' },
    { id: 4, nombre: 'Facultad de Ciencias Sociales, Humanidades y Artes' },
    { id: 5, nombre: 'Facultad de Ciencias Jurídicas y Políticas' }
  ];

  const programas = {
    1: ['Ingeniería de Sistemas', 'Ingeniería Industrial', 'Ingeniería Mecatrónica', 'Ingeniería Biomédica', 'Ingeniería en Energía'],
    2: ['Medicina', 'Enfermería', 'Psicología', 'Fisioterapia', 'Nutrición y Dietética'],
    3: ['Administración de Empresas', 'Contaduría Pública', 'Economía', 'Negocios Internacionales', 'Administración Turística y Hotelera'],
    4: ['Comunicación Social', 'Artes Audiovisuales', 'Literatura', 'Música', 'Gastronomía'],
    5: ['Derecho', 'Ciencia Política', 'Relaciones Internacionales']
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Limpiar errores al cambiar el valor
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Manejar cambios en la facultad seleccionada
  const handleFacultadChange = (e) => {
    const facultadId = e.target.value;
    setFormData({
      ...formData,
      facultad: facultadId,
      programa: '' // Resetear el programa cuando cambia la facultad
    });
  };

  // Validar el formulario
  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // Validar nombre
    if (!formData.nombre.trim()) {
      tempErrors.nombre = 'El nombre es requerido';
      formIsValid = false;
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      tempErrors.apellido = 'El apellido es requerido';
      formIsValid = false;
    }

    // Validar documento
    if (!formData.documento.trim()) {
      tempErrors.documento = 'El documento es requerido';
      formIsValid = false;
    } else if (!/^\d+$/.test(formData.documento)) {
      tempErrors.documento = 'El documento debe contener solo números';
      formIsValid = false;
    }

    // Validar email
    if (!formData.email.trim()) {
      tempErrors.email = 'El email es requerido';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'El email no es válido';
      formIsValid = false;
    }

    // Validar teléfono
    if (!formData.telefono.trim()) {
      tempErrors.telefono = 'El teléfono es requerido';
      formIsValid = false;
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      tempErrors.telefono = 'El teléfono debe tener 10 dígitos';
      formIsValid = false;
    }

    // Validar fecha de nacimiento
    if (!formData.fechaNacimiento) {
      tempErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
      formIsValid = false;
    }

    // Validar facultad
    if (!formData.facultad) {
      tempErrors.facultad = 'Selecciona una facultad';
      formIsValid = false;
    }

    // Validar programa
    if (!formData.programa) {
      tempErrors.programa = 'Selecciona un programa';
      formIsValid = false;
    }

    // Validar semestre
    if (!formData.semestre) {
      tempErrors.semestre = 'Selecciona un semestre';
      formIsValid = false;
    }

    // Validar contraseña
    if (!formData.password) {
      tempErrors.password = 'La contraseña es requerida';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      formIsValid = false;
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Confirma tu contraseña';
      formIsValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Las contraseñas no coinciden';
      formIsValid = false;
    }

    // Validar aceptación de términos
    if (!formData.aceptaTerminos) {
      tempErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Datos del formulario:', formData);
      
      // Mostrar mensaje de éxito
      setSuccessMessage('¡Usuario creado exitosamente! Redirigiendo al inicio de sesión...');
      
      // Limpiar el formulario después del envío exitoso
      setFormData({
        nombre: '',
        apellido: '',
        documento: '',
        tipoDocumento: 'cc',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        programa: '',
        facultad: '',
        semestre: '',
        password: '',
        confirmPassword: '',
        aceptaTerminos: false
      });
      
      // Redireccionar después de 3 segundos (simulado)
      setTimeout(() => {
        // En una aplicación real aquí se haría la redirección
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Versión reducida para formulario */}
      <div className="bg-green-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Crear Cuenta de Usuario</h1>
          <p className="opacity-90">
            Completa el formulario para registrarte en el Portal Estudiantil UNAB
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Formulario de Usuario */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {successMessage ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                <p>{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm leading-5 font-medium text-blue-800">Información importante</h3>
                      <div className="mt-2 text-sm leading-5 text-blue-700">
                        <p>
                          Completa todos los campos con información válida. Tu cuenta será verificada con el departamento de admisiones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre(s) *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.nombre ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="Ingresa tu nombre"
                    />
                    {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                  </div>
                  
                  {/* Apellido */}
                  <div>
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido(s) *</label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.apellido ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="Ingresa tu apellido"
                    />
                    {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Tipo Documento */}
                  <div>
                    <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento *</label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    >
                      <option value="cc">Cédula de Ciudadanía</option>
                      <option value="ce">Cédula de Extranjería</option>
                      <option value="ti">Tarjeta de Identidad</option>
                      <option value="pp">Pasaporte</option>
                    </select>
                  </div>
                  
                  {/* Documento */}
                  <div className="md:col-span-2">
                    <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">Número de Documento *</label>
                    <input
                      type="text"
                      id="documento"
                      name="documento"
                      value={formData.documento}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.documento ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="Ingresa tu número de documento"
                    />
                    {errors.documento && <p className="mt-1 text-sm text-red-600">{errors.documento}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="ejemplo@unab.edu.co"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono Celular *</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.telefono ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="3XX-XXX-XXXX"
                    />
                    {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Fecha de Nacimiento */}
                  <div>
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento *</label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.fechaNacimiento ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                    />
                    {errors.fechaNacimiento && <p className="mt-1 text-sm text-red-600">{errors.fechaNacimiento}</p>}
                  </div>

                  {/* Facultad */}
                  <div>
                    <label htmlFor="facultad" className="block text-sm font-medium text-gray-700 mb-1">Facultad *</label>
                    <select
                      id="facultad"
                      name="facultad"
                      value={formData.facultad}
                      onChange={handleFacultadChange}
                      className={`mt-1 block w-full border ${errors.facultad ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                    >
                      <option value="">Selecciona una facultad</option>
                      {facultades.map((facultad) => (
                        <option key={facultad.id} value={facultad.id}>{facultad.nombre}</option>
                      ))}
                    </select>
                    {errors.facultad && <p className="mt-1 text-sm text-red-600">{errors.facultad}</p>}
                  </div>
                  
                  {/* Programa */}
                  <div>
                    <label htmlFor="programa" className="block text-sm font-medium text-gray-700 mb-1">Programa Académico *</label>
                    <select
                      id="programa"
                      name="programa"
                      value={formData.programa}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.programa ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      disabled={!formData.facultad}
                    >
                      <option value="">Selecciona un programa</option>
                      {formData.facultad && programas[formData.facultad].map((programa, index) => (
                        <option key={index} value={programa}>{programa}</option>
                      ))}
                    </select>
                    {errors.programa && <p className="mt-1 text-sm text-red-600">{errors.programa}</p>}
                  </div>
                </div>

                {/* Semestre */}
                <div>
                  <label htmlFor="semestre" className="block text-sm font-medium text-gray-700 mb-1">Semestre Actual *</label>
                  <select
                    id="semestre"
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleChange}
                    className={`mt-1 block w-full md:w-1/4 border ${errors.semestre ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                  >
                    <option value="">Selecciona un semestre</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  {errors.semestre && <p className="mt-1 text-sm text-red-600">{errors.semestre}</p>}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Acceso</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contraseña */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="********"
                    />
                    {errors.password ? (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
                    )}
                  </div>
                  
                  {/* Confirmar Contraseña */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
                      placeholder="********"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>
                
                {/* Términos y Condiciones */}
                <div className="mt-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="aceptaTerminos"
                        name="aceptaTerminos"
                        type="checkbox"
                        checked={formData.aceptaTerminos}
                        onChange={handleChange}
                        className={`focus:ring-green-500 h-4 w-4 text-green-600 border ${errors.aceptaTerminos ? 'border-red-300' : 'border-gray-300'} rounded`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="aceptaTerminos" className="font-medium text-gray-700">
                        Acepto los <a href="#" className="text-green-700 hover:text-green-600">términos y condiciones</a> y la <a href="#" className="text-green-700 hover:text-green-600">política de privacidad</a> *
                      </label>
                      {errors.aceptaTerminos && <p className="mt-1 text-sm text-red-600">{errors.aceptaTerminos}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between md:items-center pt-6 border-t border-gray-200">
                  <div className="text-sm mb-4 md:mb-0">
                    <p>¿Ya tienes una cuenta? <Link to="/login" className="text-green-700 hover:text-green-600 font-medium">Inicia sesión aquí</Link></p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Link to="/" className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-center">
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          
          {/* Información Adicional */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Importante</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Proceso de Verificación</h4>
                <p className="text-sm text-gray-600">
                  Una vez registrado, tu cuenta será verificada por el departamento de admisiones. 
                  Este proceso puede tomar hasta 24 horas hábiles. Recibirás un correo electrónico 
                  cuando tu cuenta esté activada.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Soporte Técnico</h4>
                <p className="text-sm text-gray-600">
                  Si tienes problemas durante el registro o necesitas asistencia, 
                  puedes contactar al equipo de soporte técnico en:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    soporte@unab.edu.co
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    (607) 6436111 Ext. 249
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Acción Rápida */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">¿Tienes problemas para registrarte?</h3>
                <p className="text-gray-600">Contacta con admisiones para obtener ayuda personalizada</p>
              </div>
              <a
                href="mailto:admisiones@unab.edu.co"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contactar Admisiones
                <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Enlaces Rápidos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                to="/eventos-disponibles"
                className="bg-green-100 rounded-lg p-4 flex flex-col items-center justify-center h-full transition-transform hover:scale-105"
              >
                <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h4 className="font-semibold text-center">Eventos</h4>
                <p className="text-xs text-gray-600 text-center mt-1">Eventos disponibles</p>
              </Link>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">¿Cuánto tiempo toma la verificación de mi cuenta?</h4>
                <p className="text-sm text-gray-600">
                  El proceso de verificación puede tomar hasta 24 horas hábiles. Recibirás un correo electrónico 
                  una vez que tu cuenta esté activada.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">¿Qué hago si olvidé mi contraseña?</h4>
                <p className="text-sm text-gray-600">
                  En la página de inicio de sesión encontrarás la opción "¿Olvidaste tu contraseña?". 
                  Sigue las instrucciones para restablecerla a través de tu correo electrónico.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">¿Puedo cambiar mi información personal después?</h4>
                <p className="text-sm text-gray-600">
                  Sí, una vez que tu cuenta esté activada, podrás actualizar cierta información personal desde la 
                  sección "Mi Perfil". Sin embargo, para cambios en tu programa académico o documento de identidad, 
                  deberás contactar directamente con admisiones.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">¿Es obligatorio registrarme en el portal estudiantil?</h4>
                <p className="text-sm text-gray-600">
                  Sí, el portal estudiantil es la plataforma oficial para gestionar tus actividades académicas, 
                  eventos y horas libres. Es un requisito para todos los estudiantes de la UNAB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuario;