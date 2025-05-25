import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ContactNotification from './ContactNotification';
import useContact from '../hooks/useContact';

const QuickContactButton = () => {
  const { isDarkMode } = useTheme();
  const {
    isOpen,
    showTooltip,
    notification,
    toggleMenu,
    closeMenu,
    hideNotification,
    handleMouseEnter,
    handleMouseLeave,
    contactActions
  } = useContact();

  const contactOptions = [
    {
      id: 'email',
      label: 'Correo Electrónico',
      description: 'Enviar email al soporte',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: contactActions.email,
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      id: 'phone',
      label: 'Teléfono',
      description: 'Llamar al soporte',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: contactActions.phone,
      color: 'text-green-600 hover:text-green-700'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Chat por WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
        </svg>
      ),
      action: contactActions.whatsapp,
      color: 'text-green-500 hover:text-green-600'
    },
    {
      id: 'help',
      label: 'Centro de Ayuda',
      description: 'Ver guías y FAQ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      action: contactActions.help,
      color: 'text-purple-600 hover:text-purple-700'
    }
  ];

  return (
    <>
      {/* Notificación */}
      <ContactNotification 
        show={notification.show} 
        message={notification.message} 
        type={notification.type}
        onClose={hideNotification}
      />

      {/* Overlay para cerrar el menú cuando se hace clic fuera */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25"
          onClick={closeMenu}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 quick-contact-container">
        {/* Opciones de contacto */}
        {isOpen && (
          <div className="mb-4 space-y-3 animate-slide-in-bottom-fast">
            {contactOptions.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center justify-end"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Tooltip con descripción */}
                <div className={`mr-3 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 quick-contact-tooltip ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                } border border-gray-200 dark:border-gray-700`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                </div>

                {/* Botón de opción */}
                <button
                  onClick={option.action}
                  className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 quick-contact-option ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                  } border border-gray-200 dark:border-gray-700 flex items-center justify-center ${option.color}`}
                  aria-label={option.label}
                >
                  {option.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tooltip principal */}
        {showTooltip && !isOpen && (
          <div className={`absolute bottom-16 right-0 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 quick-contact-tooltip ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } border border-gray-200 dark:border-gray-700 whitespace-nowrap`}>
            <span className="text-sm font-medium">¿Necesitas ayuda?</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Contacta con soporte estudiantil
            </p>
            {/* Flecha del tooltip */}
            <div className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              isDarkMode ? 'border-t-gray-800' : 'border-t-white'
            }`} />
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={toggleMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 quick-contact-button ${
            isOpen 
              ? 'bg-red-600 hover:bg-red-700 rotate-45' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white flex items-center justify-center group`}
          aria-label={isOpen ? 'Cerrar menú de contacto' : 'Abrir menú de contacto'}
        >
          {isOpen ? (
            // Icono de cerrar (X)
            <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icono de soporte/ayuda
            <svg className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25zM8.25 12h7.5" />
            </svg>
          )}
        </button>

        {/* Indicador de pulso cuando está cerrado */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-green-600 animate-pulse-contact opacity-20 pointer-events-none" />
        )}
      </div>
    </>
  );
};

export default QuickContactButton;