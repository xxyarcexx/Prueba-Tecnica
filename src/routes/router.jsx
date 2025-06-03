import { Routes, Route, Navigate } from 'react-router-dom';
import Employees from '../pages/employees/employees';
import HomePage from '../pages/home/home';
import EmpleadoDetallePage from '../pages/employeesProfile/profile';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path='inicio' element={<HomePage />}></Route>
            <Route path="empleados" element={<Employees />}></Route>
            <Route path="/empleados/:id" element={<EmpleadoDetallePage />}></Route>
            <Route path="/perfil/:id" element={<EmpleadoDetallePage />}></Route>
        </Routes>
    );
}


export default AppRoutes;