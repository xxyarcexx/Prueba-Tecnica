import { NavLink } from 'react-router-dom';
import { HomeIcon, UsersIcon, FileTextIcon, BarChart2, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { path: '/', name: 'Inicio', icon: <HomeIcon size={20} /> },
    { path: '/empleados', name: 'Empleados', icon: <UsersIcon size={20} /> },
    { path: '/reportes', name: 'Informes y Análisis', icon: <BarChart2 size={20} /> },
    { path: '/metadatos', name: 'Metadatos', icon: <FileTextIcon size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col py-6 px-3 bg-gradient-to-b from-red-800 to-red-700">
      <motion.div 
        className="flex justify-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-red-700">SG</span>
        </div>
      </motion.div>
      <motion.h2 
        className="text-xl font-bold text-center mb-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Sistema de Gestión
      </motion.h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            >
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-200 ${isActive 
                    ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}`
                }
              >
                <motion.span 
                  className="mr-3"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <span>{item.name}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
};

export default Sidebar;