import React from 'react';
import { estudiante } from '../data/estudiante';

const ProfilePreview = () => {
  const { nombre, semestre, cursos, horasLibres } = estudiante;
  const horasRequeridas = 48; // Suponiendo que se requieren 60 horas libres
  const horasFaltantes = Math.max(0, horasRequeridas - horasLibres);
  const porcentajeCompletado = Math.min(100, (horasLibres / horasRequeridas) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-green-700">{nombre.charAt(0)}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">{nombre}</h3>
          <p className="text-gray-600">Semestre {semestre}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Cursos Actuales</h4>
        <ul className="space-y-1">
          {cursos.map((curso, index) => (
            <li key={index} className="text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {curso}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <h4 className="font-semibold text-gray-700">Horas Libres</h4>
          <span className="text-sm font-medium text-gray-700">
            {horasLibres}/{horasRequeridas} horas
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${porcentajeCompletado}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {horasFaltantes > 0 
            ? `Te faltan ${horasFaltantes} horas para completar el requisito.`
            : "¡Has completado todas las horas requeridas!"
          }
        </p>
      </div>
    </div>
  );
};

export default ProfilePreview;