import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { empleados } from '@/pages/employees/employees';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Mail, Phone, MapPin, Calendar, Clock, Award, Briefcase, BookOpen, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Crear un objeto para buscar empleados por ID más fácilmente
const empleadosDetalle = empleados.reduce((acc, emp) => {
  acc[emp.id] = emp;
  return acc;
}, {});

// Componente para el botón de volver
const BotonVolver = () => (
  <Link to="/empleados">
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Volver a la lista
    </motion.button>
  </Link>
);

// Función para exportar a Word
const exportToWord = (empleado) => {
  const preHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Perfil de ${empleado.nombre}</title></head><body>`;
  const postHtml = "</body></html>";
  
  let html = `
    <h1>Perfil de ${empleado.nombre}</h1>
    <p><strong>Cargo:</strong> ${empleado.cargo}</p>
    <p><strong>Departamento:</strong> ${empleado.departamento}</p>
    <p><strong>Email:</strong> ${empleado.email}</p>
    <p><strong>Teléfono:</strong> ${empleado.telefono}</p>
    <p><strong>Ubicación:</strong> ${empleado.ubicacion}</p>
    <p><strong>Fecha de Ingreso:</strong> ${empleado.fechaIngreso}</p>
    <p><strong>Estado:</strong> ${empleado.estado}</p>
    <h2>Habilidades</h2>
    <ul>
      ${(empleado.habilidades || ['React', 'JavaScript', 'UI/UX', 'Tailwind CSS']).map(skill => `<li>${skill}</li>`).join('')}
    </ul>
    <h2>Educación</h2>
    <ul>
      ${(empleado.educacion || ['Ingeniería en Sistemas - Universidad Nacional', 'Máster en Desarrollo Web - Instituto Tecnológico']).map(edu => `<li>${edu}</li>`).join('')}
    </ul>
    <h2>Experiencia Laboral</h2>
    <ul>
      ${(empleado.experiencia || ['Desarrollador Frontend en Tech Solutions (2020-Presente)', 'Diseñador UI/UX en Creative Agency (2018-2020)']).map(exp => `<li>${exp}</li>`).join('')}
    </ul>
    <h2>Logros y Reconocimientos</h2>
    <ul>
      ${(empleado.logros || ['Rediseño de interfaz con +20% satisfacción', 'Mejora de eficiencia del equipo en 15%']).map(logro => `<li>${logro}</li>`).join('')}
    </ul>
    <h2>Objetivo Profesional</h2>
    <p>${empleado.objetivo || 'Buscar un rol desafiante donde pueda aplicar mis habilidades en desarrollo frontend y diseño UI/UX.'}</p>
    <p><strong>Progreso del objetivo:</strong> ${empleado.progresoObjetivo || 75}%</p>
  `;
  
  const fullHtml = preHtml + html + postHtml;
  
  const blob = new Blob([fullHtml], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Perfil_${empleado.nombre.replace(/ /g, '_')}.doc`;
  link.click();
  URL.revokeObjectURL(link.href);
};

export default function EmpleadoDetallePage() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    setTimeout(() => {
      setEmpleado(empleadosDetalle[id]);
      setLoading(false);
      // Activar animación después de cargar
      setTimeout(() => setShowAnimation(true), 300);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500">Cargando perfil del empleado...</p>
      </div>
    );
  }

  if (!empleado) {
    return (
      <div className="p-8">
        <BotonVolver />
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Empleado no encontrado</h1>
          <p className="text-gray-600">El empleado con ID {id} no existe en la base de datos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">
      <BotonVolver />
      
      <header className="flex justify-between items-center mt-6 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
        >
          Perfil de Empleado
        </motion.h1>
        
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#0284c7' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => exportToWord(empleado)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar Perfil
        </motion.button>
      </header>
      
      {/* Cambiar el fondo del avatar */}
     
      <main>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Columna de información personal */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 border-none shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-white-600"></div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="rounded-full border-4 border-white overflow-hidden h-32 w-32 shadow-lg flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-5xl font-bold">
                      {empleado.avatar ? (
                        <img 
                          src={empleado.avatar} 
                          alt={empleado.nombre} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{empleado.nombre.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                <div className="pt-20 pb-6 px-6 text-center">
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-2xl font-bold text-gray-800 mt-4"
                  >
                    {empleado.nombre}
                  </motion.h2>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-blue-600 font-medium">{empleado.cargo}</p>
                    <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-teal-600 hover:to-blue-500 text-white transition-all px-3 py-1 text-sm border border-blue-500 shadow-sm">
                      {empleado.departamento}</Badge>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-6 space-y-3"
                  >
                    <div className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{empleado.email}</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{empleado.telefono}</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{empleado.ubicacion}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 flex justify-center space-x-2"
                  >
                    <Badge className={`${empleado.estado === 'Activo' ? 'bg-green-500' : empleado.estado === 'Vacaciones' ? 'bg-amber-500' : 'bg-blue-500'} hover:${empleado.estado === 'Activo' ? 'bg-green-600' : empleado.estado === 'Vacaciones' ? 'bg-amber-600' : 'bg-blue-600'} transition-colors`}>
                      {empleado.estado}
                    </Badge>
                    <Badge className="bg-white- transition-colors">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(empleado.fechaIngreso).toLocaleDateString()}
                    </Badge>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6"
            >
              <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50 border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-500" />
                    Habilidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(empleado.habilidades || ['React', 'JavaScript', 'UI/UX', 'Tailwind CSS']).map((skill, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + (i * 0.1), duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <Badge className="bg-gradient-to-r from-blue-500 to-white text-blue-800 hover:from-white hover:to-blue-700 hover:text-white transition-all px-3 py-1 text-sm border border-blue-500 shadow-sm">
                          {skill}</Badge>

                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Columna de información detallada */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                      Educación
                    </h3>
                    <ul className="space-y-3">
                      {(empleado.educacion || [
                        'Ingeniería en Sistemas - Universidad Nacional',
                        'Máster en Desarrollo Web - Instituto Tecnológico'
                      ]).map((edu, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1), duration: 0.3 }}
                          className="flex items-start p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all hover:bg-blue-50"
                        >
                          <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-full mr-3">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-gray-700">{edu}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-indigo-500" />
                      Experiencia Laboral
                    </h3>
                    <ul className="space-y-3">
                      {(empleado.experiencia || [
                        'Desarrollador Frontend en Tech Solutions (2020-Presente)',
                        'Diseñador UI/UX en Creative Agency (2018-2020)'
                      ]).map((exp, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + (i * 0.1), duration: 0.3 }}
                          className="flex items-start p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all hover:bg-blue-50"
                        >
                          <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-teal-600 p-2 rounded-full mr-3">
                            <Briefcase className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-gray-700">{exp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-indigo-500" />
                      Logros y Reconocimientos
                    </h3>
                    <ul className="space-y-3">
                      {(empleado.logros || [
                        'Rediseño de interfaz con +20% satisfacción',
                        'Mejora de eficiencia del equipo en 15%'
                      ]).map((logro, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + (i * 0.1), duration: 0.3 }}
                          className="flex items-start p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all hover:bg-blue-50"
                        >
                          <div className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-full mr-3">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-gray-700">{logro}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="mt-6"
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-indigo-500" />
                      Objetivo Profesional
                    </h3>
                    <div className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all hover:bg-blue-50">
                      <p className="text-gray-700">{empleado.objetivo || "Buscar un rol desafiante donde pueda aplicar mis habilidades en desarrollo frontend y diseño UI/UX."}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${empleado.progresoObjetivo || 75}%` }}
                          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        ></motion.div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Progreso del objetivo: {empleado.progresoObjetivo || 75}%</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
