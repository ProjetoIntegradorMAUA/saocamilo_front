import "./App.css"
import CardAvaliacoes from "./components/CardAvaliacoes";

export default function App() {
    return (
        <>
            <CardAvaliacoes avaliacoes={[{ nome: "Lucca", data: new Date(), sudorese: 2 }]}></CardAvaliacoes>
        </>
    );
}



