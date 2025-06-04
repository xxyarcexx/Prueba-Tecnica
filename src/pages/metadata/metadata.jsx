import React from 'react';

const Metadatos = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Metadatos del Sistema</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estructura de la base de datos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Estructura de la Base de Datos</h2>
          <p><strong>Tablas utilizadas:</strong> Empleados, Departamentos, Contratos, etc.</p>
          <p><strong>Campos principales:</strong> nombre, cargo, fecha de ingreso, etc.</p>
        </div>

        {/* Información temporal */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Información Temporal</h2>
          <p><strong>Última actualización:</strong> [Fecha de la última actualización]</p>
          <p><strong>Frecuencia de actualización:</strong> Diaria</p>
        </div>

        {/* Fuente de los datos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Fuente de los Datos</h2>
          <p><strong>Origen:</strong> RH interno, Excel, BD externa</p>
          <p><strong>Carga:</strong> Manual o automáticamente</p>
        </div>

        {/* Información sensible */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Información Sensible</h2>
          <p><strong>Campos enmascarados/protegidos:</strong> [Listar campos]</p>
          <p><strong>Nivel de privacidad/accesos:</strong> [Describir nivel]</p>
        </div>

        {/* Otros detalles */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Otros Detalles</h2>
          <p><strong>Autor del dashboard:</strong> [Nombre del autor]</p>
          <p><strong>Versión/Fecha de creación:</strong> [Versión o fecha]</p>
          <p><strong>Glosario:</strong> [Términos técnicos y su significado, si aplica]</p>
        </div>
      </div>
    </div>
  );
};

export default Metadatos;