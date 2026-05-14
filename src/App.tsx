import "./App.css";
import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Manual from "./pages/Manual";
import Atletas from "./pages/Atletas";
import Configuracoes from "./pages/Configuracoes";
import Historico from "./pages/Historico";
import NewActivity from "./pages/NewActivity";
import NovoAtleta from "./pages/NovoAtleta";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Pública */}
                    <Route path="/" element={<Login />} />

                    {/* Qualquer usuário logado */}
                    <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                    <Route path="/manual" element={<ProtectedRoute><Manual /></ProtectedRoute>} />
                    <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
                    <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />

                    {/* Apenas Nutricionista */}
                    <Route path="/atletas" element={<ProtectedRoute requiredRole="NUTRITIONIST"><Atletas /></ProtectedRoute>} />
                    <Route path="/novo-atleta" element={<ProtectedRoute requiredRole="NUTRITIONIST"><NovoAtleta /></ProtectedRoute>} />

                    {/* Apenas Atleta */}
                    <Route path="/nova-atividade" element={<ProtectedRoute requiredRole="ATHLETE"><NewActivity /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}



