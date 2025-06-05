import React, { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card"
import { Search, Filter, ArrowLeft, Mail, Phone, Eye, ArrowUpDown, Users, BarChart3, Settings, Building2, UserPlus, RefreshCw } from "lucide-react"

export const empleados = [
  {
    id: 1,
    nombre: "Ana García",
    puesto: "Gerente de Recursos Humanos",
    departamento: "Recursos Humanos",
    email: "ana.garcia@empresa.com",
    telefono: "+1 234 567 8901",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Activo",
    fechaIngreso: "2020-03-15",
    ubicacion: "Madrid",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    puesto: "Desarrollador Senior",
    departamento: "Tecnología",
    email: "carlos.rodriguez@empresa.com",
    telefono: "+1 234 567 8902",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Activo",
    fechaIngreso: "2019-01-10",
    ubicacion: "Barcelona",
  },
  {
    id: 3,
    nombre: "María López",
    puesto: "Diseñadora UX/UI",
    departamento: "Diseño",
    email: "maria.lopez@empresa.com",
    telefono: "+1 234 567 8903",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Activo",
    fechaIngreso: "2021-06-20",
    ubicacion: "Valencia",
  },
  {
    id: 4,
    nombre: "Juan Martínez",
    puesto: "Analista Financiero",
    departamento: "Finanzas",
    email: "juan.martinez@empresa.com",
    telefono: "+1 234 567 8904",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Vacaciones",
    fechaIngreso: "2020-09-05",
    ubicacion: "Sevilla",
  },
  {
    id: 5,
    nombre: "Laura Sánchez",
    puesto: "Especialista en Marketing",
    departamento: "Marketing",
    email: "laura.sanchez@empresa.com",
    telefono: "+1 234 567 8905",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Activo",
    fechaIngreso: "2022-02-14",
    ubicacion: "Bilbao",
  },
  {
    id: 6,
    nombre: "Pedro Hernández",
    puesto: "Coordinador de Ventas",
    departamento: "Ventas",
    email: "pedro.hernandez@empresa.com",
    telefono: "+1 234 567 8906",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Activo",
    fechaIngreso: "2021-11-30",
    ubicacion: "Zaragoza",
  },
  {
    id: 7,
    nombre: "Carmen Ruiz",
    puesto: "Contadora Senior",
    departamento: "Finanzas",
    email: "carmen.ruiz@empresa.com",
    telefono: "+1 234 567 8907",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Activo",
    fechaIngreso: "2019-08-12",
    ubicacion: "Madrid",
  },
  {
    id: 8,
    nombre: "Roberto Silva",
    puesto: "Desarrollador Frontend",
    departamento: "Tecnología",
    email: "roberto.silva@empresa.com",
    telefono: "+1 234 567 8908",
    avatar: "/placeholder.svg?height=40&width=40",
    estado: "Remoto",
    fechaIngreso: "2023-01-15",
    ubicacion: "Barcelona",
  },
]

const Employees = () => {
  // Estado para la vista móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Estados para la búsqueda, filtrado y ordenamiento
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  
  // Efecto para simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Obtener departamentos únicos para el filtro
  const uniqueDepartments = useMemo(() => {
    return [...new Set(empleados.map(emp => emp.departamento))];
  }, []);
  
  // Obtener estados únicos para el filtro
  const uniqueStatuses = useMemo(() => {
    return [...new Set(empleados.map(emp => emp.estado))];
  }, []);
  
  // Filtrado y ordenamiento de empleados
  const filteredEmployees = useMemo(() => {
    // Filtrar por término de búsqueda
    let result = empleados.filter(emp => 
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departamento.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filtrar por puesto
    if (filterRole !== "all") {
      result = result.filter(emp => emp.puesto.includes(filterRole));
    }
    
    // Filtrar por departamento
    if (filterDepartment !== "all") {
      result = result.filter(emp => emp.departamento === filterDepartment);
    }
    
    // Filtrar por estado
    if (filterStatus !== "all") {
      result = result.filter(emp => emp.estado === filterStatus);
    }
    
    // Ordenar
    return result.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      
      if (typeof valueA === "string") {
        return sortOrder === "asc" 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  }, [searchTerm, filterRole, filterDepartment, filterStatus, sortBy, sortOrder]);

  // Estadísticas de empleados
  const stats = useMemo(() => {
    return {
      total: empleados.length,
      activos: empleados.filter(emp => emp.estado === 'Activo').length,
      vacaciones: empleados.filter(emp => emp.estado === 'Vacaciones').length,
      remotos: empleados.filter(emp => emp.estado === 'Remoto').length,
      departamentos: uniqueDepartments.length
    };
  }, [uniqueDepartments]);

  // Función para obtener el color de la badge según el estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'Activo': return 'bg-green-100 text-green-800 border-green-300';
      case 'Vacaciones': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Remoto': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-500">Cargando datos de empleados...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-primary-700 animate-slideInLeft">Gestión de Empleados</h1>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <h3 className="text-2xl font-bold mt-1 text-primary-700">{stats.total}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-green-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Activos</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">{stats.activos}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-amber-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Vacaciones</p>
                <h3 className="text-2xl font-bold mt-1 text-amber-600">{stats.vacaciones}</h3>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-purple-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Remotos</p>
                <h3 className="text-2xl font-bold mt-1 text-purple-600">{stats.remotos}</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-red-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Departamentos</p>
                <h3 className="text-2xl font-bold mt-1 text-red-600">{stats.departamentos}</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <Building2 className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-center gap-4 animate-slideInRight">
        <div className="relative w-full md:w-auto">
          <Input
            type="text"
            placeholder="Buscar por nombre, puesto o departamento..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 border-primary-200 focus:border-primary-500 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full md:w-[180px] border-primary-200 focus:border-primary-500 transition-all duration-300">
            <SelectValue placeholder="Filtrar por departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los departamentos</SelectItem>
            {uniqueDepartments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px] border-primary-200 focus:border-primary-500 transition-all duration-300">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {uniqueStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full md:w-[180px] border-primary-200 focus:border-primary-500 transition-all duration-300">
            <SelectValue placeholder="Filtrar por puesto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los puestos</SelectItem>
            <SelectItem value="Gerente">Gerente</SelectItem>
            <SelectItem value="Desarrollador">Desarrollador</SelectItem>
            <SelectItem value="Diseñador">Diseñador</SelectItem>
            <SelectItem value="Analista">Analista</SelectItem>
            <SelectItem value="Especialista">Especialista</SelectItem>
            <SelectItem value="Coordinador">Coordinador</SelectItem>
            <SelectItem value="Contador">Contador</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px] border-primary-200 focus:border-primary-500 transition-all duration-300">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="nombre">Nombre</SelectItem>
            <SelectItem value="puesto">Puesto</SelectItem>
            <SelectItem value="fechaIngreso">Fecha de ingreso</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="w-full md:w-auto group"
          variant="outline"
        >
          <ArrowUpDown className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
          {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </Button>
        
        
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <Users className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No se encontraron empleados</h3>
          <p className="text-gray-500 mt-1">Intenta con otros criterios de búsqueda</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setFilterRole('all');
              setFilterDepartment('all');
              setFilterStatus('all');
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Restablecer filtros
          </Button>
        </div>
      ) : isMobile ? (
        // Vista de tarjetas para móviles
        <div className="grid grid-cols-1 gap-4">
          {filteredEmployees.map((empleado, index) => (
            <Card 
              key={empleado.id} 
              className="overflow-hidden transition-all hover:shadow-md hover:bg-gray-50 animate-fadeIn"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary-100">
                      <AvatarImage alt="Avatar" src={empleado.avatar} />
                      <AvatarFallback className="bg-primary-600 text-white">{empleado.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to={`/perfil/${empleado.id}`} className="font-medium hover:underline text-primary-700 transition-colors duration-200">
                        {empleado.nombre}
                      </Link>
                      <p className="text-sm text-gray-500">{empleado.puesto}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(empleado.estado)} border`}>
                    {empleado.estado}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Departamento</p>
                    <p>{empleado.departamento}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="truncate">{empleado.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Teléfono</p>
                    <p>{empleado.telefono}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ubicación</p>
                    <p>{empleado.ubicacion}</p>
                  </div>
                  <div className="col-span-2 flex justify-end mt-3">
                    <Link to={`/perfil/${empleado.id}`}>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                        <span>Ver perfil</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Tabla para pantallas más grandes
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm animate-scaleUp">
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead className="hidden md:table-cell">Departamento</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden xl:table-cell">Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden lg:table-cell">Ubicación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((empleado, index) => (
                <TableRow 
                  key={empleado.id} 
                  className="hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <TableCell className="font-medium">{empleado.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden sm:flex h-8 w-8 border-2 border-primary-100">
                        <AvatarImage 
                          alt="Avatar" 
                          src={empleado.avatar} 
                          onError={(e) => {
                            e.target.src = '/placeholder-user.png';
                          }}
                        />
                        <AvatarFallback className="bg-primary-700 text-white">
                          {empleado.nombre.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Link to={`/perfil/${empleado.id}`} className="hover:underline text-primary-700 transition-colors duration-200">{empleado.nombre}</Link>
                    </div>
                  </TableCell>
                  <TableCell>{empleado.puesto}</TableCell>
                  <TableCell className="hidden md:table-cell">{empleado.departamento}</TableCell>
                  <TableCell className="hidden lg:table-cell truncate max-w-[200px]">{empleado.email}</TableCell>
                  <TableCell className="hidden xl:table-cell">{empleado.telefono}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`whitespace-nowrap ${getStatusColor(empleado.estado)} border`}>
                      {empleado.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{empleado.ubicacion}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/perfil/${empleado.id}`}>
                        <Button size="icon" variant="outline" className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        onClick={() => window.open(`mailto:${empleado.email}`)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Mostrando {filteredEmployees.length} de {empleados.length} empleados
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Siguiente
            <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Employees;
