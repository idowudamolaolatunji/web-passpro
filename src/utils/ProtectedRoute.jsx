import { Outlet, Navigate } from 'react-router-dom'
import DashboardBase from '../ui/DashboardBase';
import { useAuthContext } from '../context/AuthContext';


function ProtectedRoute() {
    let { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <DashboardBase>
            <Outlet />
        </DashboardBase>
    );
}

export default ProtectedRoute;