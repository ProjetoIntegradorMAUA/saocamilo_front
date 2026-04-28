import "./App.css";
import CardAvaliacoes from "../components/Avaliacoes/Avaliacoes";
import { FaRegCalendar } from "react-icons/fa";

export default function App() {
    return (
        <>
            <CardAvaliacoes
                icone={<FaRegCalendar />}
                avaliacoes={[
                    {
                        nome: "Diego Piol Amancio",
                        data: new Date(),
                        sudorese: 1.72,
                    },
                    {
                        nome: "Lucca de Barros",
                        data: new Date(),
                        sudorese: 1.67,
                    },
                    {
                        nome: "Caique Frassão",
                        data: new Date(),
                        sudorese: 1.57,
                    },
                ]}
            />
        </>
    );
}
