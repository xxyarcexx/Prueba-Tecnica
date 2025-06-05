import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { empleados } from '@/pages/employees/employees';
import { Link } from 'react-router-dom';
import { Users, BarChart3, FileText, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { BarChart2, RefreshCw, ChevronRight, Activity, Briefcase, UserPlus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Home = () => {
  const totalEmpleados = empleados.length;
  const empleadosActivos = empleados.filter(emp => emp.estado === 'Activo').length;
  const empleadosVacaciones = empleados.filter(emp => emp.estado === 'Vacaciones').length;
  const empleadosRemotos = empleados.filter(emp => emp.estado === 'Remoto').length;
  
  // Estado para la fecha y hora actual
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Actualizar la fecha y hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
  // Función para formatear la fecha
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Función para formatear la hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Datos para gráficos
  const departmentData = [
    { name: 'Ventas', value: 45 },
    { name: 'Desarrollo', value: 35 },
    { name: 'RH', value: 15 },
    { name: 'Finanzas', value: 20 },
    { name: 'Operaciones', value: 35 }
  ];

  const statusData = [
    { name: 'Activos', value: empleadosActivos },
    { name: 'Vacaciones', value: empleadosVacaciones },
    { name: 'Remotos', value: empleadosRemotos }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-primary-700">Bienvenido al Panel de Administración</h1>
            <p className="text-gray-500 mt-1">Gestión integral de recursos humanos</p>
          </div>
          <div className="text-right bg-white p-3 rounded-lg shadow-sm animate-slideInRight">
            <p className="text-sm text-gray-500">{formatDate(currentDateTime)}</p>
            <p className="text-lg font-semibold text-primary-600">{formatTime(currentDateTime)}</p>
          </div>
        </div>
        
        {/* Tarjetas de resumen con animación */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50"> <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Empleados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{totalEmpleados}</p>
              <p className="text-sm text-gray-500">Total registrados</p>
              <div className="mt-2 h-1 w-full bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/empleados">
              <Button variant="outline" size="sm" className="w-full hover:bg-blue-50 hover:text-blue-700 flex justify-between items-center">
              <span>Ver detalles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-600" />
                Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{empleadosActivos}</p>
              <p className="text-sm text-gray-500">{Math.round((empleadosActivos/totalEmpleados)*100)}% del total</p>
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.round((empleadosActivos/totalEmpleados)*100)}%` }}></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/empleados">
                <Button variant="outline" size="sm" className="w-full hover:bg-green-50 hover:text-green-700 flex justify-between items-center">
                  <span>Ver detalles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                Vacaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">{empleadosVacaciones}</p>
              <p className="text-sm text-gray-500">{Math.round((empleadosVacaciones/totalEmpleados)*100)}% del total</p>
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.round((empleadosVacaciones/totalEmpleados)*100)}%` }}></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/empleados">
                <Button variant="outline" size="sm" className="w-full hover:bg-amber-50 hover:text-amber-700 flex justify-between items-center">
                  <span>Ver detalles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50"> <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Remotos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">{empleadosRemotos}</p>
              <p className="text-sm text-gray-500">{Math.round((empleadosRemotos/totalEmpleados)*100)}% del total</p>
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.round((empleadosRemotos/totalEmpleados)*100)}%` }}></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/empleados">
                <Button variant="outline" size="sm" className="w-full hover:bg-purple-50 hover:text-purple-700 flex justify-between items-center">
                  <span>Ver detalles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* Secciones principales con gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-1 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary-600" />
                Gestión de Empleados
              </CardTitle>
              <CardDescription>Administra la información de tus empleados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>{empleadosActivos} empleados activos</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  <span>{empleadosVacaciones} empleados en vacaciones</span>
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  <span>{empleadosRemotos} empleados en remoto</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/empleados" className="w-full">
              <Button variant="default"className="w-full bg-primary-600 hover:bg-primary-700 text-black border border-black">
  Ir a Empleados
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                Informes y Análisis
              </CardTitle>
              <CardDescription>Genera reportes y analiza datos clave.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Distribución por departamento</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Antigüedad promedio</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tasa de retención</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/reportes" className="w-full">
                <Button variant="outline" className="w-full hover:bg-primary-50 hover:text-primary-700 flex justify-between items-center">
                  <span>Ver Informes Completos</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Tarjetas de estadísticas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nuevas contrataciones</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8% este mes
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tasa de retención</p>
                  <h3 className="text-2xl font-bold mt-1">94%</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +2% vs año anterior
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Departamentos</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Briefcase className="h-3 w-3 mr-1" /> Todos activos
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Actividad reciente - Sección adicional */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-primary-700 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Actividad Reciente
          </h2>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="p-4 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${[
                        "bg-blue-100 text-blue-600",
                        "bg-green-100 text-green-600",
                        "bg-amber-100 text-amber-600",
                        "bg-purple-100 text-purple-600",
                        "bg-red-100 text-red-600"
                      ][index]}`}>
                        {[
                          <UserPlus className="h-4 w-4" key="1" />,
                          <RefreshCw className="h-4 w-4" key="2" />,
                          <Calendar className="h-4 w-4" key="3" />,
                          <Briefcase className="h-4 w-4" key="4" />,
                          <Award className="h-4 w-4" key="5" />
                        ][index]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {[
                          "Actualización de datos de empleado",
                          "Nuevo empleado registrado",
                          "Cambio de estado de empleado",
                          "Actualización de departamento",
                          "Modificación de permisos"
                        ][index]}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {[
                          "Ana García actualizó su información de contacto",
                          "Carlos Rodríguez fue añadido al sistema",
                          "María López cambió a estado 'Vacaciones'",
                          "Juan Martínez fue transferido a Finanzas",
                          "Pedro Hernández recibió nuevos permisos"
                        ][index]}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">
                      {[
                        "Hace 5 minutos",
                        "Hace 2 horas",
                        "Ayer",
                        "Hace 2 días",
                        "Hace 1 semana"
                      ][index]}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50">
              <Button variant="ghost" className="w-full text-primary-600 hover:text-primary-700 hover:bg-primary-50 flex justify-center items-center">
                <span>Ver todas las actividades</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;