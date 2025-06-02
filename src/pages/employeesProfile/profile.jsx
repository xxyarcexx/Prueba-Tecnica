import React from "react"
import { useParams } from "react-router-dom"
import { empleados } from "../employees/employees" // Import the empleados array
import {
  Button
} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Badge
} from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
// Removed import for Separator
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap
} from "lucide-react"

const empleadosDetalle = empleados.reduce((acc, empleado) => {
  acc[empleado.id] = empleado;
  return acc;
}, {});

export default function EmpleadoDetallePage() {
  const { id } = useParams();
  const empleado = empleadosDetalle[parseInt(id)]

  if (!empleado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Empleado no encontrado</h1>
          <Button onClick={() => window.history.back()}>Volver al Directorio</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Directorio
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Perfil del Empleado</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardContent className="flex flex-col items-center text-center p-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={empleado.avatar} />
              <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-gray-900">{empleado.nombre}</h2>
            <p className="text-gray-600">{empleado.puesto}</p>
            <Badge className="mt-2" variant="secondary">{empleado.departamento}</Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Mail className="h-5 w-5 mr-2" />Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Email: <a href={`mailto:${empleado.email}`} className="text-blue-600 hover:underline">{empleado.email}</a></p>
              <p className="text-gray-700">Teléfono: <a href={`tel:${empleado.telefono}`} className="text-blue-600 hover:underline">{empleado.telefono}</a></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2" />Información Laboral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Puesto: {empleado.puesto}</p>
              <p className="text-gray-700">Departamento: {empleado.departamento}</p>
              <p className="text-gray-700 flex items-center"><Calendar className="h-4 w-4 mr-1" />Fecha de Ingreso: {empleado.fechaIngreso}</p>
              <p className="text-gray-700 flex items-center"><MapPin className="h-4 w-4 mr-1" />Ubicación: {empleado.ubicacion}</p>
              <p className="text-gray-700">Estado: <Badge variant={empleado.estado === "Activo" ? "default" : "outline"}>{empleado.estado}</Badge></p>
            </CardContent>
          </Card>


          {empleado.habilidades && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2" />Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {empleado.habilidades.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {empleado.educacion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><GraduationCap className="h-5 w-5 mr-2" />Educación</CardTitle>
              </CardHeader>
              <CardContent>
                {empleado.educacion.map((edu, index) => (
                  <p key={index} className="text-gray-700">{edu.titulo} en {edu.institucion} ({edu.año})</p>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
