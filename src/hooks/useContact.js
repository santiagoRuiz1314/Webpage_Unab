import { useState, useCallback } from 'react';

const useContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [notification, setNotification] = useState({ 
    show: false, 
    message: '', 
    type: 'success' 
  });

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ show: true, message, type });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({ show: false, message: '', type: 'success' });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isOpen) {
      setShowTooltip(true);
    }
  }, [isOpen]);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // Funciones de contacto
  const contactActions = {
    email: useCallback(() => {
      window.location.href = 'mailto:soporte@unab.edu.co?subject=Consulta Portal Estudiantil&body=Hola, necesito ayuda con...';
      closeMenu();
      showNotification('Abriendo cliente de correo electrónico...', 'info');
    }, [closeMenu, showNotification]),

    phone: useCallback(() => {
      window.open('tel:+576076436111', '_self');
      closeMenu();
      showNotification('Iniciando llamada al soporte estudiantil...', 'success');
    }, [closeMenu, showNotification]),

    whatsapp: useCallback(() => {
      window.open('https://wa.me/573216547890?text=Hola, necesito ayuda con el Portal Estudiantil UNAB', '_blank');
      closeMenu();
      showNotification('Abriendo WhatsApp...', 'success');
    }, [closeMenu, showNotification]),

    help: useCallback(() => {
      window.open('https://unab.edu.co/soporte', '_blank');
      closeMenu();
      showNotification('Abriendo Centro de Ayuda...', 'info');
    }, [closeMenu, showNotification])
  };

  return {
    isOpen,
    showTooltip,
    notification,
    toggleMenu,
    closeMenu,
    showNotification,
    hideNotification,
    handleMouseEnter,
    handleMouseLeave,
    contactActions
  };
};

export default useContact;