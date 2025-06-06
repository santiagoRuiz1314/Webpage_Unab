import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary-700 dark:bg-primary-800 text-white shadow-lg transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="text-primary-700 dark:text-primary-800 font-bold text-lg">U</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Portal Estudiantil</h1>
                <p className="text-sm text-primary-100 dark:text-primary-200">UNAB</p>
              </div>
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="hover:text-primary-200 dark:hover:text-primary-300 transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Inicio
            </Link>
            <Link 
              to="/eventos-disponibles" 
              className="hover:text-primary-200 dark:hover:text-primary-300 transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Eventos
            </Link>
            <Link 
              to="/horas-libres" 
              className="hover:text-primary-200 dark:hover:text-primary-300 transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Horas Libres
            </Link>
            <Link 
              to="/consejos-estudiantiles" 
              className="hover:text-primary-200 dark:hover:text-primary-300 transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Consejos
            </Link>
            <Link 
              to="/perfil" 
              className="hover:text-primary-200 dark:hover:text-primary-300 transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Mi Perfil
            </Link>
          </nav>

          {/* Usuario, Tema y Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">Bienvenido,</p>
              <p className="text-xs text-primary-100 dark:text-primary-200">{user?.username}</p>
            </div>
            
            {/* Botón de alternancia de tema */}
            <ThemeToggleButton />
            
            <button
              onClick={handleLogout}
              className="bg-primary-600 dark:bg-primary-700 hover:bg-primary-500 dark:hover:bg-primary-600 px-4 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Cerrar Sesión
            </button>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Botón de tema para móvil */}
            <ThemeToggleButton />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary-200 dark:hover:text-primary-300 focus:outline-none focus:text-primary-200 dark:focus:text-primary-300"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-primary-600 dark:border-primary-700">
              <Link 
                to="/" 
                className="block hover:bg-primary-600 dark:hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/eventos-disponibles" 
                className="block hover:bg-primary-600 dark:hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Eventos
              </Link>
              <Link 
                to="/horas-libres" 
                className="block hover:bg-primary-600 dark:hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Horas Libres
              </Link>
              <Link 
                to="/consejos-estudiantiles" 
                className="block hover:bg-primary-600 dark:hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Consejos
              </Link>
              <Link 
                to="/perfil" 
                className="block hover:bg-primary-600 dark:hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Mi Perfil
              </Link>
              <div className="border-t border-primary-600 dark:border-primary-700 pt-3 mt-3">
                <div className="px-3 py-2">
                  <p className="text-sm text-primary-100 dark:text-primary-200">Conectado como:</p>
                  <p className="text-sm font-medium">{user?.username}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-primary-600 dark:bg-primary-700 hover:bg-primary-500 dark:hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;