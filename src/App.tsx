import "./App.css"
import CardAvaliacoes from "./components/CardAvaliacoes";

export default function App() {
    return (
        <>
            <CardAvaliacoes avaliacoes={[{ nome: "Lucca de Barros Rodrigues", data: new Date(), sudorese: 2 }]}></CardAvaliacoes>
        </>
    );
}



