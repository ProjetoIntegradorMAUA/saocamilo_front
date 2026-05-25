import "./App.css";
import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Manual from "./pages/Manual";
import Atletas from "./pages/Atletas";
import Configuracoes from "./pages/Configuracoes";
import NovoAtleta from "./pages/NovoAtleta";
import AdicionarAtletas from "./pages/AdicionarAtletas";
import NewActivity from "./pages/NewActivity";
import Historico from "./pages/Historico";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Pública */}
                    <Route path="/" element={<Login />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/manual" element={<Manual />} />
                    <Route path="/atletas" element={<Atletas />} />
                    <Route path="/novo-nutricionista" element={<NovoAtleta />} />
                    <Route path="/adicionar-atleta" element={<AdicionarAtletas />} />
                    <Route path="/nova-atividade" element={<NewActivity />} />
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    <Route path="/historico" element={<Historico />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}



