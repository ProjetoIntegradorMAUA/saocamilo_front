import "./App.css";
import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Manual from "./pages/Manual";
import Atletas from "./pages/Atletas";
import Configuracoes from "./pages/Configuracoes";
import Historico from "./pages/Historico";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/manual" element={<Manual />} />
                    <Route path="/atletas" element={<Atletas />} />
                    <Route path="/historico" element={<Historico />} />
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}



