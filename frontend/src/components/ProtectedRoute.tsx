import { Navigate, Outlet } from 'react-router-dom';
import { getTokenData } from '../utils/auth';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const tokenData = getTokenData();
  
  console.log('Token Data:', tokenData); 
  console.log('Allowed Roles:', allowedRoles); 

  if (!tokenData) {
    console.log('No token data found'); 
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(tokenData.role)) {
    console.log('Role not allowed:', tokenData.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;