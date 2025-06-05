import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Users, Briefcase, Clock, Calendar, TrendingUp, Award, RefreshCw, Download, UserPlus, Building2, Layers, Activity } from 'lucide-react';
import { empleados } from '@/pages/employees/employees';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Procesar datos reales de empleados
  useEffect(() => {
    setLoading(true);
    
    // Calcular estadísticas basadas en datos reales de empleados
    setTimeout(() => {
      // Contar empleados por departamento
      const departmentCounts = {};
      empleados.forEach(emp => {
        departmentCounts[emp.departamento] = (departmentCounts[emp.departamento] || 0) + 1;
      });
      
      // Contar empleados por estado
      const statusCounts = {};
      empleados.forEach(emp => {
        statusCounts[emp.estado] = (statusCounts[emp.estado] || 0) + 1;
      });
      
      // Calcular antigüedad promedio
      const today = new Date();
      const tenures = empleados.map(emp => {
        const hireDate = new Date(emp.fechaIngreso);
        const diffTime = Math.abs(today - hireDate);
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
        return diffYears;
      });
      const avgTenure = tenures.reduce((sum, tenure) => sum + tenure, 0) / tenures.length;
      
      // Contar empleados por ubicación
      const locationCounts = {};
      empleados.forEach(emp => {
        locationCounts[emp.ubicacion] = (locationCounts[emp.ubicacion] || 0) + 1;
      });
      
      // Simular datos de contratación mensual basados en fechas de ingreso
      const monthlyHires = Array(12).fill(0).map((_, i) => ({ 
        month: new Date(0, i).toLocaleString('es-ES', { month: 'short' }), 
        hires: 0 
      }));
      
      empleados.forEach(emp => {
        const hireDate = new Date(emp.fechaIngreso);
        const month = hireDate.getMonth();
        monthlyHires[month].hires += 1;
      });
      
      // Simular distribución por edad
      const ageGroups = {
        '18-25': Math.floor(empleados.length * 0.2),
        '26-35': Math.floor(empleados.length * 0.4),
        '36-45': Math.floor(empleados.length * 0.3),
        '46+': empleados.length - Math.floor(empleados.length * 0.9)
      };
      
      // Simular distribución por género
      const genderRatio = {
        male: Math.floor(empleados.length * 0.55),
        female: empleados.length - Math.floor(empleados.length * 0.55)
      };
      
      // Simular tipos de contrato
      const contractTypes = {
        'Fijo': Math.floor(empleados.length * 0.6),
        'Temporal': Math.floor(empleados.length * 0.3),
        'Aprendiz': empleados.length - Math.floor(empleados.length * 0.9)
      };
      
      // Ordenar empleados por antigüedad para el ranking
      const sortedByTenure = [...empleados].sort((a, b) => {
        const dateA = new Date(a.fechaIngreso);
        const dateB = new Date(b.fechaIngreso);
        return dateA - dateB;
      }).slice(0, 5).map(emp => ({
        name: emp.nombre,
        department: emp.departamento,
        years: ((new Date() - new Date(emp.fechaIngreso)) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1)
      }));
      
      setData({
        totalEmployees: empleados.length,
        departments: departmentCounts,
        contractTypes: contractTypes,
        newHires: {
          month: monthlyHires.slice(-1)[0].hires,
          quarter: monthlyHires.slice(-3).reduce((sum, m) => sum + m.hires, 0),
          year: monthlyHires.reduce((sum, m) => sum + m.hires, 0)
        },
        monthlyHires: monthlyHires,
        avgTenure: avgTenure.toFixed(1) + ' años',
        turnover: {
          hired: monthlyHires.slice(-1)[0].hires,
          left: Math.floor(monthlyHires.slice(-1)[0].hires * 0.6),
          rate: (monthlyHires.slice(-1)[0].hires * 0.6 / empleados.length * 100).toFixed(1) + '%'
        },
        genderRatio: genderRatio,
        ageGroups: ageGroups,
        locations: locationCounts,
        absenceRate: '2.1%',
        performance: {
          excellent: 25,
          good: 55,
          average: 15,
          needsImprovement: 5
        },
        seniorityRanking: sortedByTenure
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // Simular actualización de datos
    setTimeout(() => {
      // Aquí podrías hacer una nueva llamada a la API
      setLoading(false);
    }, 1000);
  };

  // Añadir esta función para exportar a Word
  const exportToWord = () => {
    if (!data) return; // Asegurarse de que los datos estén cargados

    const preHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reporte de Empleados</title></head><body>`;
    const postHtml = "</body></html>";
    
    // Crear contenido HTML para el documento Word
    let html = `
      <h1>Reporte de Empleados</h1>
      <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString()}</p>
      
      <h2>Indicadores Clave (KPI)</h2>
      <ul>
        <li><strong>Total Empleados:</strong> ${data.totalEmployees}</li>
        <li><strong>Nuevas Contrataciones (este mes):</strong> ${data.newHires.month}</li>
        <li><strong>Antigüedad Promedio:</strong> ${data.avgTenure}</li>
        <li><strong>Rotación de Personal:</strong> ${data.turnover.rate}</li>
      </ul>
      
      <h2>Distribución por Departamento</h2>
      <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <tr>
          <th>Departamento</th>
          <th>Cantidad</th>
        </tr>
        ${Object.entries(data.departments).map(([dept, count]) => `
          <tr>
            <td>${dept}</td>
            <td>${count}</td>
          </tr>
        `).join('')}
      </table>
      
      <h2>Distribución por Tipo de Contrato</h2>
      <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <tr>
          <th>Tipo de Contrato</th>
          <th>Cantidad</th>
        </tr>
        ${Object.entries(data.contractTypes).map(([type, count]) => `
          <tr>
            <td>${type}</td>
            <td>${count}</td>
          </tr>
        `).join('')}
      </table>
      
      <h2>Distribución por Edad</h2>
      <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <tr>
          <th>Rango de Edad</th>
          <th>Cantidad</th>
        </tr>
        ${Object.entries(data.ageGroups).map(([range, count]) => `
          <tr>
            <td>${range} años</td>
            <td>${count}</td>
          </tr>
        `).join('')}
      </table>
      
      <h2>Distribución por Género</h2>
      <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <tr>
          <th>Género</th>
          <th>Cantidad</th>
        </tr>
        <tr>
          <td>Hombres</td>
          <td>${data.genderRatio.male}</td>
        </tr>
        <tr>
          <td>Mujeres</td>
          <td>${data.genderRatio.female}</td>
        </tr>
      </table>
      
      <h2>Ranking de Antigüedad</h2>
      <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          <th>Departamento</th>
          <th>Años</th>
        </tr>
        ${data.seniorityRanking.map((employee, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.years}</td>
          </tr>
        `).join('')}
      </table>
    `;
    
    const fullHtml = preHtml + html + postHtml;
    
    // Crear y descargar el archivo
    const blob = new Blob([fullHtml], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_Empleados_${new Date().toLocaleDateString().replace(/\//g, '-')}.doc`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Componente para KPI con animación
  const KpiCard = ({ title, value, subtitle, icon: Icon, trend, trendDirection, color = 'blue' }) => (
    <Card className={`overflow-hidden transition-all hover:shadow-md animate-fadeIn bg-gradient-to-br from-white to-${color}-50`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-500`} />
      </CardHeader>
      <CardContent className="pt-4">
        <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center mt-1 text-xs ${trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trendDirection === 'up' ? '↑' : '↓'} {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Colores para gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  if (loading || !data) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500">Cargando datos de reportes...</p>
      </div>
    );
  }

  // Preparar datos para gráficos
  const departmentData = Object.entries(data.departments).map(([name, value]) => ({ name, value }));
  const contractData = Object.entries(data.contractTypes).map(([name, value]) => ({ name, value }));
  const ageData = Object.entries(data.ageGroups).map(([name, value]) => ({ name, value }));
  const genderData = [
    { name: 'Hombres', value: data.genderRatio.male },
    { name: 'Mujeres', value: data.genderRatio.female }
  ];
  const performanceData = Object.entries(data.performance).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
    value
  }));
  const locationData = Object.entries(data.locations).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-700 animate-slideInLeft">Reportes de Empleados</h1>
        <div className="flex space-x-2 animate-slideInRight">
          <button 
            onClick={handleRefresh}
            className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </button>
          <button 
            onClick={exportToWord}
            className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-scaleUp">
        <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary-600" />
          Indicadores Clave (KPI)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <KpiCard 
            title="Total Empleados" 
            value={data.totalEmployees} 
            subtitle="Activos" 
            icon={Users} 
            trend="+3% vs mes anterior" 
            trendDirection="up"
            color="blue"
          />
          
          <KpiCard 
            title="Nuevas Contrataciones" 
            value={data.newHires.month} 
            subtitle="Este mes" 
            icon={UserPlus} 
            color="green"
          />
          
          <KpiCard 
            title="Antigüedad Promedio" 
            value={data.avgTenure} 
            icon={Clock} 
            color="purple"
          />
          
          <KpiCard 
            title="Rotación de Personal" 
            value={data.turnover.rate} 
            subtitle={`+${data.turnover.hired} / -${data.turnover.left}`} 
            icon={TrendingUp} 
            trend="-0.5% vs mes anterior" 
            trendDirection="up"
            color="amber"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn">
          <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-primary-600" />
            Distribución por Departamento
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0088FE" name="Empleados">
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(data.departments).map(([dept, count], index) => (
              <div key={dept} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {dept}
                </span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary-600" />
            Distribución por Tipo de Contrato
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contractData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {contractData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(data.contractTypes).map(([type, count], index) => (
              <div key={type} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {type}
                </span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary-600" />
            Distribución por Edad
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Empleados">
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(data.ageGroups).map(([range, count], index) => (
              <div key={range} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {range} años
                </span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary-600" />
            Distribución por Género
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#0088FE" />
                  <Cell fill="#FF8042" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#0088FE' }}></span>
                Hombres
              </span>
              <span className="font-semibold">{data.genderRatio.male}%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FF8042' }}></span>
                Mujeres
              </span>
              <span className="font-semibold">{data.genderRatio.female}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
          Tendencia de Contratación Mensual
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.monthlyHires}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="hires" stroke="#8884d8" fill="#8884d8" name="Contrataciones" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary-600" />
            Desempeño
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Porcentaje">
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(data.performance).map(([level, count], index) => (
              <div key={level} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {level.charAt(0).toUpperCase() + level.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-semibold">{count}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
            <Layers className="h-5 w-5 mr-2 text-primary-600" />
            Distribución por Ubicación
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(data.locations).map(([location, count], index) => (
              <div key={location} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {location}
                </span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <h2 className="text-lg font-semibold mb-4 text-primary-700 flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary-600" />
          Ranking de Antigüedad
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Años</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.seniorityRanking.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

