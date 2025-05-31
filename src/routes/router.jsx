import { Routes, Route } from 'react-router-dom';
import Employees from '../pages/employees/employees';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/empleados" element={<Employees></Employees>}></Route>
        </Routes>
    )
}