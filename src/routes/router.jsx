import { Routes, Route, Navigate } from 'react-router-dom';
import Employees from '../pages/employees/employees';
import Home from '../pages/home/home';
import EmpleadoDetallePage from '../pages/employeesProfile/profile';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path='inicio' element={<Home />}></Route>
            <Route path="empleados" element={<Employees />}></Route>
            <Route path="/empleados/:id" element={<EmpleadoDetallePage />}></Route>
        </Routes>
    );
}


export default AppRoutes;