import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Search, Filter, ArrowLeft, Mail, Phone, Eye, ArrowUpDown } from "lucide-react"


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

function Employees() {
    const [busqueda, setBusqueda] = useState("")
    const [filtroDepto, setFiltroDepto] = useState("todos")
    const [filtroEstado, setFiltroEstado] = useState("todos")
    const [ordenPor, setOrdenPor] = useState("nombre")
    const [ordenDireccion, setOrdenDireccion] = useState("asc") // Removed TypeScript annotation

    const departamentos = [...new Set(empleados.map((emp) => emp.departamento))]
    const estados = [...new Set(empleados.map((emp) => emp.estado))]

    const empleadosFiltrados = empleados
        .filter((empleado) => {
        const coincideBusqueda =
            empleado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.puesto.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.email.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.departamento.toLowerCase().includes(busqueda.toLowerCase())

        const coincideDepto = filtroDepto === "todos" || empleado.departamento === filtroDepto
        const coincideEstado = filtroEstado === "todos" || empleado.estado === filtroEstado

        return coincideBusqueda && coincideDepto && coincideEstado
        }).sort((a, b) => {
            let aValue = a[ordenPor];
            let bValue = b[ordenPor];

            // Si es fecha, conviértela en objeto Date
            if (ordenPor === "fechaIngreso") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (typeof aValue === "string") aValue = aValue.toLowerCase();
            if (typeof bValue === "string") bValue = bValue.toLowerCase();

            if (aValue === undefined || bValue === undefined) return 0;

            if (ordenDireccion === "asc") {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        })


    const handleSort = (campo) => {
        if (ordenPor === campo) {
        setOrdenDireccion(ordenDireccion === "asc" ? "desc" : "asc")
        } else {
        setOrdenPor(campo)
        setOrdenDireccion("asc")
        }
    }

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                <Link href="/">
                    <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al Inicio
                    </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Directorio de Empleados</h1>
                </div>
                <Badge variant="secondary">{empleadosFiltrados.length} empleados</Badge>
            </div>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filtros y Búsqueda */}
            <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Búsqueda y Filtros
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                    placeholder="Buscar por nombre, puesto, email o departamento..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={filtroDepto} onValueChange={setFiltroDepto}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos los departamentos</SelectItem>
                        {departamentos.map((depto) => (
                        <SelectItem key={depto} value={depto}>
                            {depto}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>

                    <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos los estados</SelectItem>
                        {estados.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                            {estado}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </CardContent>
            </Card>

            {/* Tabla de Empleados */}
            <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">
                        <Button variant="ghost" onClick={() => handleSort("nombre")} className="h-auto p-0 font-semibold">
                            Empleado
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("puesto")} className="h-auto p-0 font-semibold">
                            Puesto
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                        <Button
                            variant="ghost"
                            onClick={() => handleSort("departamento")}
                            className="h-auto p-0 font-semibold"
                        >
                            Departamento
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>
                        <Button
                            variant="ghost"
                            onClick={() => handleSort("ubicacion")}
                            className="h-auto p-0 font-semibold"
                        >
                            Ubicación
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                        <Button
                            variant="ghost"
                            onClick={() => handleSort("fechaIngreso")}
                            className="h-auto p-0 font-semibold"
                        >
                            Fecha Ingreso
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("estado")} className="h-auto p-0 font-semibold">
                            Estado
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {empleadosFiltrados.map((empleado) => (
                        <TableRow key={empleado.id} className="hover:bg-gray-50">
                        <TableCell>
                            <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={empleado.avatar || "/placeholder.svg"} alt={empleado.nombre} />
                                <AvatarFallback>
                                {empleado.nombre
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-gray-900">{empleado.nombre}</div>
                            </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="text-sm text-gray-900">{empleado.puesto}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{empleado.departamento}</Badge>
                        </TableCell>
                        <TableCell>
                            <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-3 w-3 mr-1" />
                                <span className="truncate max-w-[150px]">{empleado.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-3 w-3 mr-1" />
                                <span>{empleado.telefono}</span>
                            </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-gray-900">{empleado.ubicacion}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-gray-600">{formatearFecha(empleado.fechaIngreso)}</span>
                        </TableCell>
                        <TableCell>
                            <Badge
                            variant={
                                empleado.estado === "Activo"
                                ? "default"
                                : empleado.estado === "Remoto"
                                    ? "secondary"
                                    : "outline"
                            }
                            >
                            {empleado.estado}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                            <Link to={`/empleados/${empleado.id}`}>
                            <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                            </Link>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
            </Card>

            {empleadosFiltrados.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                No se encontraron empleados que coincidan con los filtros aplicados.
                </p>
            </div>
            )}
        </main>
        </div>
    )    
}



export default Employees;