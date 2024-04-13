import { Navigate } from 'react-router-dom'
export default function RedirectedProtectedRoutes({ children, isAuthenticated }) {
    return isAuthenticated === true ? <Navigate to='/dashboard' /> : children
}