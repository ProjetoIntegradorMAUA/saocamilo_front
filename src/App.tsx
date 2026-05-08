import "./App.css";
import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Manual from "./pages/Manual";
import Homepage from "./pages/Homepage";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/manual" element={<Manual />} />
                    <Route path="/homepage" element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}



