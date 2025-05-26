import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggleButton from '../components/ThemeToggleButton';
import QuickContactButton from '../components/QuickContactButton';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Credenciales válidas
  const VALID_CREDENTIALS = {
    username: 'admin',
    password: '1234'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar errores al cambiar el valor
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // Validar usuario
    if (!formData.username.trim()) {
      tempErrors.username = 'El usuario es requerido';
      formIsValid = false;
    }

    // Validar contraseña
    if (!formData.password.trim()) {
      tempErrors.password = 'La contraseña es requerida';
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setErrors({});
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular tiempo de carga
    setTimeout(() => {
      // Verificar credenciales
      if (formData.username === VALID_CREDENTIALS.username && 
          formData.password === VALID_CREDENTIALS.password) {
        // Login exitoso - actualizar contexto y redirigir
        login(formData.username);
        navigate('/');
      } else {
        // Credenciales incorrectas
        setErrors({
          general: 'Usuario o contraseña incorrectos. Intenta nuevamente.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8">
        {/* Botón de tema en la esquina superior derecha */}
        <div className="flex justify-end">
          <ThemeToggleButton />
        </div>
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Portal Estudiantil UNAB</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ingresa con tus credenciales para continuar
          </p>
        </div>

        {/* Formulario de Login */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error general */}
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-400">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Campo Usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.username 
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
                } rounded-md shadow-sm focus:outline-none sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200`}
                placeholder="Ingresa tu usuario"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password 
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
                } rounded-md shadow-sm focus:outline-none sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200`}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                    : 'bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400'
                } transition duration-300`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>

          {/* Información de prueba */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400">Credenciales de prueba</h4>
                <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  <p><strong>Usuario:</strong> admin</p>
                  <p><strong>Contraseña:</strong> 1234</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes una cuenta?{' '}
              <button 
                onClick={() => navigate('/crear-usuario')}
                className="text-primary-700 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium"
                disabled={isLoading}
              >
                Regístrate aquí
              </button>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" disabled={isLoading}>
                ¿Olvidaste tu contraseña?
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Universidad Autónoma de Bucaramanga (UNAB). Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Botón de contacto rápido para la página de login */}
      <QuickContactButton />
    </div>
  );
};

export default Login;