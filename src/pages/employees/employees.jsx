import React, { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Search, Filter, ArrowLeft, Mail, Phone, Eye, ArrowUpDown, Users, BarChart3, Settings, Building2 } from "lucide-react"
// import Sidebar from "@/components/Sidebar"; // Eliminada la importación del Sidebar


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

// Elimina estas líneas (114-115):
// Mantén todas las importaciones existentes
// Añade esta importación si no la tienes
// import { useState, useMemo, useEffect } from "react";

// Mantén la constante empleados y el resto del código hasta el return

const Employees = () => {
  // Estado para la vista móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Estados para la búsqueda, filtrado y ordenamiento
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  
  // Efecto para detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  }, [searchTerm, filterRole, sortBy, sortOrder]);

  return (
    <div className="w-full animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">Gestión de Empleados</h1>

      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <Input
          type="text"
          placeholder="Buscar por nombre, puesto o departamento..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-auto"
        />
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full md:w-[180px]">
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
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="nombre">Nombre</SelectItem>
            <SelectItem value="puesto">Puesto</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="w-full md:w-auto"
        >
          {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </Button>
      </div>

      {isMobile ? (
        // Vista de tarjetas para móviles
        <div className="grid grid-cols-1 gap-4">
          {filteredEmployees.map(empleado => (
            <Card key={empleado.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage alt="Avatar" src={empleado.avatar} />
                      <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to={`/perfil/${empleado.id}`} className="font-medium hover:underline">
                        {empleado.nombre}
                      </Link>
                      <p className="text-sm text-gray-500">{empleado.puesto}</p>
                    </div>
                  </div>
                  <Badge variant={empleado.estado === 'Activo' ? 'default' : 'outline'}>
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
                  <div className="col-span-2 flex justify-end mt-3">
                    <Link to={`/perfil/${empleado.id}`}>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
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
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
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
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map(empleado => (
                <TableRow key={empleado.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{empleado.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden sm:flex h-8 w-8">
                        <AvatarImage alt="Avatar" src={empleado.avatar} />
                        <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Link to={`/perfil/${empleado.id}`} className="hover:underline">{empleado.nombre}</Link>
                    </div>
                  </TableCell>
                  <TableCell>{empleado.puesto}</TableCell>
                  <TableCell className="hidden md:table-cell">{empleado.departamento}</TableCell>
                  <TableCell className="hidden lg:table-cell truncate max-w-[200px]">{empleado.email}</TableCell>
                  <TableCell className="hidden xl:table-cell">{empleado.telefono}</TableCell>
                  <TableCell>
                    <Badge variant={empleado.estado === 'Activo' ? 'default' : 'outline'} className="whitespace-nowrap">
                      {empleado.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/perfil/${empleado.id}`}>
                      <Button size="icon" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Employees;