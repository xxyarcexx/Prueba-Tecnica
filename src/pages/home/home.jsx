import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import Sidebar from '@/components/Sidebar'; // Eliminada la importación del Sidebar
import { empleados } from '@/pages/employees/employees'; // Importar el array de empleados

const Home = () => {
  const totalEmpleados = empleados.length; // Obtener la cantidad de empleados

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex-1 p-4 pt-16 lg:pl-64 lg:pt-4">
        <h1 className="text-3xl font-bold mb-6">Bienvenido al Panel de Administración</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Gestión de Empleados</CardTitle>
              <CardDescription>Administra la información de tus empleados.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total de empleados registrados: <strong>{totalEmpleados}</strong></p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Informes y Análisis</CardTitle>
              <CardDescription>Genera reportes y analiza datos clave.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Aquí se mostraría la información relevante de la sección de Informes */}
              {/* Por ejemplo: gráficos resumen, enlaces a informes principales, etc. */}
              <p>Contenido de la sección de Informes (placeholder)</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Metadatos del Sistema</CardTitle>
              <CardDescription>Configura y gestiona los metadatos de la aplicación.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Aquí se mostraría la información relevante de la sección de Metadatos */}
              {/* Por ejemplo: estado de la configuración, enlaces a ajustes, etc. */}
              <p>Contenido de la sección de Metadatos (placeholder)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;

<div className="bg-white rounded-lg shadow-md p-6">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido</h1>
  <p className="text-gray-600">Contenido de la página de inicio...</p>
</div>