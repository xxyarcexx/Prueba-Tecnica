import React, { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Search, Filter, ArrowLeft, Mail, Phone, Eye, ArrowUpDown, Users, BarChart3, Settings, Building2 } from "lucide-react"
import Sidebar from "@/components/Sidebar"; // Import the new Sidebar component


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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredEmployees = useMemo(() => {
    let filtered = empleados;

    if (filterRole !== 'all') {
      filtered = filtered.filter(empleado => empleado.puesto.includes(filterRole)); // Changed from empleado.rol to empleado.puesto
    }

    if (searchTerm) {
      filtered = filtered.filter(
        empleado =>
          empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          empleado.puesto.toLowerCase().includes(searchTerm.toLowerCase()) || // Added puesto to search
          empleado.departamento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortBy === 'nombre') {
        return sortOrder === 'asc'
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      } else if (sortBy === 'puesto') { // Added sort by puesto
        return sortOrder === 'asc'
          ? a.puesto.localeCompare(b.puesto)
          : b.puesto.localeCompare(a.puesto);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, filterRole, sortBy, sortOrder]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 pt-16 lg:pl-64 lg:pt-4">
        <h1 className="text-3xl font-bold mb-6">Gestión de Empleados</h1>

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

        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map(empleado => (
                <TableRow key={empleado.id}>
                  <TableCell>{empleado.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage alt="Avatar" src={empleado.avatar} />
                        <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Link to={`/perfil/${empleado.id}`}>{empleado.nombre}</Link>
                    </div>
                  </TableCell>
                  <TableCell>{empleado.puesto}</TableCell>
                  <TableCell>{empleado.departamento}</TableCell>
                  <TableCell>{empleado.email}</TableCell>
                  <TableCell>{empleado.telefono}</TableCell>
                  <TableCell>
                    <Badge variant={empleado.estado === 'Activo' ? 'default' : 'outline'}>
                      {empleado.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
      </div>
    </div>
  );
};

export default Employees;