import { Outlet, Navigate } from 'react-router-dom'
import DashboardBase from '../ui/DashboardBase';


function ProtectedRoute() {
    // let { user } = useAuthContext();

    const user = { name: "test" };

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