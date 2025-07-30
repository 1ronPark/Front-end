import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const PrivateRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;