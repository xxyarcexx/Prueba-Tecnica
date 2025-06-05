import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';


import Home from '../pages/home/home';
import Employees from '../pages/employees/employees';
import EmpleadoDetallePage from '../pages/employeesProfile/profile';
import Metadatos from '../pages/metadata/metadata';
import Reports from '../pages/Reports/reports';
import Sidebar from '../components/Sidebar';

function AppRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar en pantallas grandes */}
      <div className="hidden lg:block lg:w-64 bg-red-700 text-white shadow-lg">
        <Sidebar />
      </div>

      {/* Sidebar móvil */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300"
            onClick={toggleSidebar}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-red-700 text-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-end p-4">
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-cream-100 focus:outline-none transition-colors duration-200"
              >
                <XIcon size={24} />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header móvil */}
        <header className="bg-white shadow-sm lg:hidden sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              onClick={toggleSidebar} 
              className="text-gray-800 hover:text-red-700 focus:outline-none transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <MenuIcon size={24} />
            </button>
            <h1 className="text-lg font-semibold">Sistema de Gestión</h1>
          </div>
        </header>

        {/* Rutas */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="w-full max-w-7xl mx-auto">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/empleados' element={<Employees />} />
              <Route path='/perfil/:id' element={<EmpleadoDetallePage />} />
              <Route path='/metadatos' element={<Metadatos />} />
              <Route path='/reportes' element={<Reports />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppRouter;
