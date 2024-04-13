import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes({ children, isAuthenticated }) {
    return isAuthenticated === true ? children : <Navigate to='/' /> 
}