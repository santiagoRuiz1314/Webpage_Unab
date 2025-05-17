import React from 'react';

function Announcements() {
  const announcements = [
    {
      id: 1,
      title: 'Inscripciones abiertas para Semestre 2025-2',
      date: '2025-05-15',
      content: 'Las inscripciones para el semestre 2025-2 están abiertas. Por favor, consulta las fechas importantes en el calendario académico.',
      category: 'Académico',
      priority: 'alta'
    },
    {
      id: 2,
      title: 'Mantenimiento programado en sistemas UNAB',
      date: '2025-05-16',
      content: 'El sistema de gestión académica estará en mantenimiento el sábado 20 de mayo de 8:00 AM a 12:00 PM.',
      category: 'Sistemas',
      priority: 'media'
    },
    {
      id: 3,
      title: 'Convocatoria Becas de Excelencia',
      date: '2025-05-12',
      content: 'Se han abierto las convocatorias para las Becas de Excelencia Académica 2025-2. Los estudiantes interesados pueden aplicar hasta el 30 de mayo.',
      category: 'Financiero',
      priority: 'alta'
    }
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Anuncios Importantes</h3>
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{announcement.title}</h4>
              <span className={`${getPriorityClass(announcement.priority)} text-xs font-medium py-1 px-2 rounded`}>
                {announcement.category}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {announcement.content}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Publicado: {formatDate(announcement.date)}
              </span>
              
              <button className="text-green-700 hover:text-green-800 text-sm font-medium inline-flex items-center">
                Leer más
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcements;