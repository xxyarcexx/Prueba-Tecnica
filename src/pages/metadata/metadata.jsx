import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Calendar, FileText, Shield, Info, RefreshCw, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

const Metadatos = () => {
  // Estado para controlar la expansión de las secciones
  const [expandedSections, setExpandedSections] = useState({
    estructura: false,
    temporal: false,
    fuente: false,
    sensible: false,
    otros: false
  });
  
  // Estado para la última actualización
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  // Función para alternar la expansión de una sección
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Función para actualizar los datos
  const handleUpdate = () => {
    setIsUpdating(true);
    // Simulación de actualización
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsUpdating(false);
    }, 1500);
  };
  
  // Función para exportar los datos
  const handleExport = () => {
    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Metadatos del Sistema</title></head><body>`;
    const postHtml = "</body></html>";
    
    let content = `
      <h1>Metadatos del Sistema</h1>
      <p><strong>Fecha de exportación:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      
      <h2>Estructura de la Base de Datos</h2>
      <p>Información sobre las tablas y campos utilizados</p>
      <h3>Tablas principales</h3>
      <ul>
        <li>Empleados</li>
        <li>Departamentos</li>
        <li>Contratos</li>
        <li>Habilidades</li>
        <li>Educación</li>
      </ul>
      
      <h2>Información Temporal</h2>
      <p>Detalles sobre la actualización de datos</p>
      <p><strong>Última actualización:</strong> ${lastUpdate.toLocaleDateString()} ${lastUpdate.toLocaleTimeString()}</p>
      
      <h2>Fuente de los Datos</h2>
      <p>Origen y proceso de carga de datos</p>
      
      <h2>Información Sensible</h2>
      <p>Datos protegidos y niveles de acceso</p>
      
      <h2>Otros Detalles</h2>
      <p>Información adicional sobre el sistema</p>
    `;
    
    const fullHtml = preHtml + content + postHtml;
    
    const blob = new Blob([fullHtml], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'metadatos_sistema.doc';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-400 animate-slideInLeft">Metadatos del Sistema</h1>
        <div className="flex space-x-2 animate-slideInRight">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-white hover:bg-blue-100 text-blue-700 border border-blue-200 hover:scale-105 transition-all"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Actualizando...' : 'Actualizar'}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-white hover:bg-green-100 text-green-700 border border-green-200 hover:scale-105 transition-all"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estructura de la base de datos */}
        <Card className="hover:scale-105 transition-all duration-300 overflow-hidden border-l-4 border-blue-400 shadow-sm hover:shadow-md animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2 cursor-pointer bg-gradient-to-r from-blue-50 to-white" onClick={() => toggleSection('estructura')}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                Estructura de la Base de Datos
              </CardTitle>
              {expandedSections.estructura ? 
                <ChevronUp className="h-5 w-5 text-blue-500" /> : 
                <ChevronDown className="h-5 w-5 text-blue-500" />}
            </div>
            <CardDescription>Información sobre las tablas y campos utilizados</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-500 ${expandedSections.estructura ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-blue-700">Tablas principales</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Empleados</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Departamentos</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Contratos</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Habilidades</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Educación</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-blue-700">Campos principales</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-2 text-blue-600">Campo</th>
                      <th className="text-left py-2 text-blue-600">Tipo</th>
                      <th className="text-left py-2 text-blue-600">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                      <td className="py-2">id</td>
                      <td className="py-2">Integer</td>
                      <td className="py-2">Identificador único</td>
                    </tr>
                    <tr className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                      <td className="py-2">nombre</td>
                      <td className="py-2">String</td>
                      <td className="py-2">Nombre completo</td>
                    </tr>
                    <tr className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                      <td className="py-2">puesto</td>
                      <td className="py-2">String</td>
                      <td className="py-2">Cargo actual</td>
                    </tr>
                    <tr className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                      <td className="py-2">estado</td>
                      <td className="py-2">Enum</td>
                      <td className="py-2">Estado laboral actual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className={`pt-0 ${!expandedSections.estructura && 'hidden'}`}>
            <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:bg-blue-50">
              Ver documentación completa
            </Button>
          </CardFooter>
        </Card>

        {/* Información temporal */}
        <Card className="hover:scale-105 transition-all duration-300 overflow-hidden border-l-4 border-green-400 shadow-sm hover:shadow-md animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2 cursor-pointer bg-gradient-to-r from-green-50 to-white" onClick={() => toggleSection('temporal')}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Información Temporal
              </CardTitle>
              {expandedSections.temporal ? 
                <ChevronUp className="h-5 w-5 text-green-500" /> : 
                <ChevronDown className="h-5 w-5 text-green-500" />}
            </div>
            <CardDescription>Detalles sobre la actualización de datos</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-500 ${expandedSections.temporal ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                <span className="font-medium text-green-700">Última actualización:</span>
                <span className="text-green-700">{lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-green-700">Frecuencia de actualización</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 hover:bg-green-50 rounded transition-colors">
                    <span>Datos de empleados:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700 animate-pulse">Diaria</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-green-50 rounded transition-colors">
                    <span>Estructura organizacional:</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700">Semanal</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-green-50 rounded transition-colors">
                    <span>Métricas de rendimiento:</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">Mensual</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-green-700">Historial de actualizaciones</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 hover:bg-green-50 rounded transition-colors">
                    <span className="font-medium">10/05/2023:</span>
                    <span>Actualización de datos personales</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                  <span>05/05/2023:</span>
                  <span>Actualización de departamentos</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                  <span>01/05/2023:</span>
                  <span>Carga inicial de datos</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fuente de los datos */}
        <Card className="hover:scale-105 transition-all duration-300 overflow-hidden border-l-4 border-amber-400 shadow-sm hover:shadow-md animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2 cursor-pointer bg-gradient-to-r from-amber-50 to-white" onClick={() => toggleSection('fuente')}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-5 w-5 mr-2 text-amber-600" />
                Fuente de los Datos
              </CardTitle>
              {expandedSections.fuente ? 
                <ChevronUp className="h-5 w-5 text-amber-500" /> : 
                <ChevronDown className="h-5 w-5 text-amber-500" />}
            </div>
            <CardDescription>Origen y proceso de carga de datos</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-300 ${expandedSections.fuente ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Sistemas de origen</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Sistema de RH interno (SAP HR)</li>
                  <li>Hojas de cálculo Excel departamentales</li>
                  <li>Base de datos externa de contratistas</li>
                  <li>Sistema de gestión de talento</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Proceso de carga</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Método principal:</strong> ETL automatizado</p>
                  <p><strong>Frecuencia:</strong> Diaria (2:00 AM)</p>
                  <p><strong>Validación:</strong> Verificación automática de integridad</p>
                  <p><strong>Fallback:</strong> Carga manual disponible en caso de error</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-md text-sm">
                <p className="font-medium text-amber-800">Nota importante:</p>
                <p className="text-amber-700">Los datos de empleados externos se actualizan con menor frecuencia (semanal) y pueden requerir validación adicional.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información sensible */}
        <Card className="hover:scale-105 transition-all duration-300 overflow-hidden border-l-4 border-red-400 shadow-sm hover:shadow-md animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2 cursor-pointer bg-gradient-to-r from-red-50 to-white" onClick={() => toggleSection('sensible')}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Información Sensible
              </CardTitle>
              {expandedSections.sensible ? 
                <ChevronUp className="h-5 w-5 text-red-500" /> : 
                <ChevronDown className="h-5 w-5 text-red-500" />}
            </div>
            <CardDescription>Datos protegidos y niveles de acceso</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-300 ${expandedSections.sensible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Campos protegidos</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700">Número de identificación</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700">Datos bancarios</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700">Información médica</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700">Evaluaciones de desempeño</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700">Salario</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Niveles de acceso</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Nivel</th>
                      <th className="text-left py-2">Permisos</th>
                      <th className="text-left py-2">Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">1</td>
                      <td className="py-2">Solo lectura básica</td>
                      <td className="py-2">Empleados</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">2</td>
                      <td className="py-2">Lectura completa</td>
                      <td className="py-2">Gerentes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">3</td>
                      <td className="py-2">Lectura/Escritura</td>
                      <td className="py-2">RH</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">4</td>
                      <td className="py-2">Acceso completo</td>
                      <td className="py-2">Administradores</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-primary-50 rounded-md text-sm overflow-hidden">
                <p className="font-medium">Política de privacidad:</p>
                <p className="break-words">Todos los datos sensibles están encriptados en la base de datos.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Otros detalles */}
        <Card className="hover:scale-105 transition-all duration-300 overflow-hidden border-l-4 border-teal-400 shadow-sm hover:shadow-md animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-2 cursor-pointer bg-gradient-to-r from-teal-50 to-white" onClick={() => toggleSection('otros')}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Info className="h-5 w-5 mr-2 text-teal-600" />
                Otros Detalles
              </CardTitle>
              {expandedSections.otros ? 
                <ChevronUp className="h-5 w-5 text-teal-500" /> : 
                <ChevronDown className="h-5 w-5 text-teal-500" />}
            </div>
            <CardDescription>Información adicional sobre el sistema</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-300 ${expandedSections.otros ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Información del sistema</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Autor:</span>
                    <span>SENA: Juan José Hernández Yarce</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versión:</span>
                    <span>1.2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fecha de creación:</span>
                    <span>01/06/2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Última actualización:</span>
                    <span>10/06/2025</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Tecnologías utilizadas</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">React</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Tailwind CSS</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Glosario</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>ETL:</strong> Extract, Transform, Load</p>
                  <p><strong>RGPD/GDPR:</strong> Reglamento General de Protección de Datos</p>
                  <p><strong>API:</strong> Application Programming Interface</p>
                  <p><strong>UI/UX:</strong> User Interface/User Experience</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Metadatos;