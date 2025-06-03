import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, BarChartIcon, SettingsIcon } from 'lucide-react'; // Asumiendo que los iconos vienen de lucide-react

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col min-h-screen">
      <div className="flex items-center justify-center h-16 border-b px-4">
        <span className="text-2xl font-semibold text-gray-800">Admin Panel</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 ${location.pathname === '/' ? 'bg-gray-100' : ''}`}
            >
              <HomeIcon className="h-4 w-4" />
              Volver a Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/empleados"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 ${location.pathname === '/empleados' ? 'bg-gray-100' : ''}`}
            >
              <UsersIcon className="h-4 w-4" />
              Empleados
            </Link>
          </li>
          <li>
            <Link
              to="/informes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 ${location.pathname === '/informes' ? 'bg-gray-100' : ''}`}
            >
              <BarChartIcon className="h-4 w-4" />
              Informes
            </Link>
          </li>
          <li>
            <Link
              to="/metadatos"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 ${location.pathname === '/metadatos' ? 'bg-gray-100' : ''}`}
            >
              <SettingsIcon className="h-4 w-4" />
              Metadatos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;