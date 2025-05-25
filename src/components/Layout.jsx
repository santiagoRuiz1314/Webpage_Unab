import React from 'react';
import Header from './Header';
import QuickContactButton from './QuickContactButton';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* Botón de contacto rápido disponible en todas las páginas */}
      <QuickContactButton />
    </div>
  );
};

export default Layout;