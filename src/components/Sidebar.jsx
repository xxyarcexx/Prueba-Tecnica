import { NavLink } from 'react-router-dom';
import { HomeIcon, UsersIcon, FileTextIcon } from 'lucide-react';
// Remove the framer-motion import line

const Sidebar = () => {
  const menuItems = [
    { path: '/', name: 'Inicio', icon: <HomeIcon size={20} /> },
    { path: '/empleados', name: 'Empleados', icon: <UsersIcon size={20} /> },
    { path: '/metadatos', name: 'Metadatos', icon: <FileTextIcon size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col py-6 px-3">
      <h2 className="text-2xl font-bold text-center mb-10 text-cream-100">Menú</h2>
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded transition-all duration-200 ${isActive 
                    ? 'bg-red-800 text-cream-100 shadow-md' 
                    : 'hover:bg-red-800 hover:text-cream-100'}`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 text-center text-sm text-cream-100 opacity-70">
        <p>Sistema de Gestión v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;