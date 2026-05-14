import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../services/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: "NUTRITIONIST" | "ATHLETE"; // Se undefined, só verifica se está logado
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const token = getToken();
    const role = getRole();

    // Não está logado → vai para login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Está logado mas não tem o perfil necessário → vai para homepage
    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/homepage" replace />;
    }

    return <>{children}</>;
}
